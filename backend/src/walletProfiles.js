const crypto = require('crypto');

// Simulação educativa de perfis de carteira e geração de endereços testnet.
// Em produção, conecte-se a um node RPC/SDK apropriado e use geração real de endereços.

function generateTestBtcAddress() {
  return 'tb1q' + crypto.randomBytes(10).toString('hex');
}

function generateTestMoneroAddress() {
  return 'monero_test_' + crypto.randomBytes(8).toString('hex');
}

function generateAddress({ currency = 'BTC', profile = 'receiving' } = {}) {
  if (currency.toLowerCase() === 'monero') return generateTestMoneroAddress();
  return generateTestBtcAddress();
}

module.exports = { generateAddress };