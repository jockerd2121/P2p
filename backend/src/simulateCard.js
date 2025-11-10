function simulateCard(cardData) {
  if (!cardData) return false;
  const panRegex = /^4[0-9]{15}$/; // Visa-like test PAN
  const cvvRegex = /^[0-9]{3,4}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2,4}$/;
  return panRegex.test(cardData.pan) && cvvRegex.test(cardData.cvv) && expiryRegex.test(cardData.expiry);
}
module.exports = { simulateCard };