const express = require('express');
const bodyParser = require('body-parser');
const { simulateCard } = require('./simulateCard');
const { simulateIso8583 } = require('./simulateIso8583');
const { simulateCrypto } = require('./simulateCrypto');
const { ephemeralStore } = require('./ephemeralStore');

const app = express();
app.use(bodyParser.json());

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Endpoint principal: recebe dados, processa, retorna TXIDs simulados
app.post('/api/convert', async (req, res) => {
  try {
    const { cardData, amount, btcAddress } = req.body;
    if (!cardData || !amount || !btcAddress) return res.status(400).json({ error: 'missing parameters' });

    const validCard = simulateCard(cardData);
    if (!validCard) return res.status(400).json({ error: 'Dados de cartão inválidos/simulados.' });

    const authorization = simulateIso8583(cardData, amount);
    const result = await simulateCrypto(amount, btcAddress);

    ephemeralStore.save(result.txid, result);

    // Schedule ephemeral cleanup
    setTimeout(() => ephemeralStore.delete(result.txid), 60 * 1000);

    return res.json({ authorization, txids: [result.moneroTxid, result.btcTxid], blockexplorers: [result.moneroExplorer, result.btcExplorer], txid: result.txid });
  } catch (err) {
    console.error('convert error', err);
    return res.status(500).json({ error: 'internal' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));