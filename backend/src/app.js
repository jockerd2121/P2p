const express = require('express');
const bodyParser = require('body-parser');
const { simulateCard } = require('./simulateCard');
const { simulateIso8583 } = require('./simulateIso8583');
const { simulateCrypto } = require('./simulateCrypto');
const { ephemeralStore } = require('./ephemeralStore');
const { generateAddress } = require('./walletProfiles');

const app = express();
app.use(bodyParser.json());

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Endpoint de geração de endereço de recebimento (testnet)
app.get('/api/new-address', (req, res) => {
  // No PoC só geramos endereços simulados; em produção ligar ao node
  const currency = req.query.currency || 'BTC';
  const addr = generateAddress({ currency });
  return res.json({ address: addr, currency });
});

// Endpoint principal: recebe dados, processa, retorna TXIDs simulados
app.post('/api/convert', async (req, res) => {
  try {
    const { cardData, amount, btcAddress, consent } = req.body;
    if (!consent) return res.status(400).json({ error: 'Consentimento é obrigatório para testes.' });

    if (!cardData || !amount || !btcAddress) return res.status(400).json({ error: 'missing parameters' });

    // Não logar IPs ou dados sensíveis. Apenas validações de PoC.
    const validCard = simulateCard(cardData);
    if (!validCard) return res.status(400).json({ error: 'Dados de cartão inválidos/simulados.' });

    const authorization = simulateIso8583(cardData, amount);
    const result = await simulateCrypto(amount, btcAddress);

    // Armazenamento efêmero (criptografado em memória)
    ephemeralStore.save(result.txid, { authorization, result, meta: { timestamp: Date.now() } });

    // Limpeza agendada (exemplo). TTL configurável.
    setTimeout(() => ephemeralStore.delete(result.txid), 60 * 1000);

    return res.json({ authorization, txids: [result.moneroTxid, result.btcTxid], blockexplorers: [result.moneroExplorer, result.btcExplorer], txid: result.txid });
  } catch (err) {
    // Não vazar stack traces na resposta
    console.error('convert error', err && err.message);
    return res.status(500).json({ error: 'internal' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));