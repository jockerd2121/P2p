function simulateIso8583(cardData, amount) {
  return {
    isoMessage: '0200',
    responseCode: '00',
    amount,
    authCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
    timestamp: new Date().toISOString(),
    simulated: true,
  };
}
module.exports = { simulateIso8583 };