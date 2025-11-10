async function simulateCrypto(amount, btcAddress) {
  // Simula latência e geração de txids
  await new Promise((r) => setTimeout(r, 250));
  const moneroTxid = `monero_${Math.random().toString(36).slice(2, 16)}`;
  const btcTxid = `btc_${Math.random().toString(36).slice(2, 16)}`;
  return {
    moneroTxid,
    btcTxid,
    moneroExplorer: `https://stagenet.xmrchain.net/tx/${moneroTxid}`,
    btcExplorer: `https://mempool.space/testnet/tx/${btcTxid}`,
    txid: btcTxid,
  };
}
module.exports = { simulateCrypto };