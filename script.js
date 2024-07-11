// Função para buscar as taxas de câmbio da API
async function fetchExchangeRates() {
    const apiKey = 'e82de4551f64fd9fa3cc6a09'; // Troque pela sua chave de API da ExchangeRate-API
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/BRL`);
    const data = await response.json();
    return data.conversion_rates;
  }
  
  // Função para realizar a conversão de moeda
  function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const currency = document.getElementById('currency').value;
    
    fetchExchangeRates().then(rates => {
      const rate = rates[currency];
      if (rate) {
        const convertedAmount = amount * rate;
        document.getElementById('result').innerText = `${amount.toFixed(2)} BRL = ${convertedAmount.toFixed(2)} ${currency}`;
      } else {
        document.getElementById('result').innerText = 'Erro ao converter moeda. Tente novamente mais tarde.';
      }
    }).catch(error => {
      console.error('Erro ao buscar taxas de câmbio:', error);
      document.getElementById('result').innerText = 'Erro ao buscar taxas de câmbio. Tente novamente mais tarde.';
    });
  }
  
  // Função para atualizar manualmente as taxas de câmbio
  function refreshRates() {
    fetchExchangeRates().then(rates => {
      console.log('Taxas atualizadas:', rates);
      document.getElementById('result').innerText = 'Taxas atualizadas com sucesso!';
    }).catch(error => {
      console.error('Erro ao atualizar taxas de câmbio:', error);
      document.getElementById('result').innerText = 'Erro ao atualizar taxas de câmbio. Tente novamente mais tarde.';
    });
  }
  