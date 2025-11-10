document.getElementById('convertForm').onsubmit = async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const consent = document.getElementById('consent').checked;
  if (!consent) {
    document.getElementById('result').textContent = 'Você precisa aceitar o termo de consentimento para prosseguir.';
    return;
  }
  const payload = {
    cardData: { pan: data.pan, cvv: data.cvv, expiry: data.expiry },
    amount: parseFloat(data.amount),
    btcAddress: data.btcAddress,
    consent: true
  };
  const resEl = document.getElementById('result');
  resEl.textContent = 'Processando...';
  try {
    const resp = await fetch('/api/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await resp.json();
    if (!resp.ok) throw new Error(json.error || 'Erro');
    resEl.innerHTML = `<pre>${JSON.stringify(json, null, 2)}</pre>`;
    // Auto-destruição visual (exemplo)
    setTimeout(() => { document.body.innerHTML = '<h2>Ambiente limpo!</h2>'; }, 60 * 1000);
  } catch (err) {
    resEl.textContent = 'Erro: ' + err.message;
  }
};