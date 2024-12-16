import fetch from 'node-fetch';

async function getCurrencyRates() {
  try {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    
    console.log('Курсы валют на', new Date(data.Date).toLocaleDateString('ru-RU'));
    console.log('\nОсновные валюты:');
    console.log('─'.repeat(50));
    
    // Display main currencies
    const mainCurrencies = ['USD', 'EUR', 'GBP', 'CNY'];
    mainCurrencies.forEach(code => {
      const currency = data.Valute[code];
      console.log(`${currency.Name} (${code}): ${currency.Value.toFixed(2)} ₽`);
      const change = currency.Value - currency.Previous;
      const changeSymbol = change > 0 ? '↑' : change < 0 ? '↓' : '=';
      console.log(`Изменение: ${changeSymbol} ${Math.abs(change).toFixed(2)} ₽\n`);
    });
    
    console.log('Другие валюты:');
    console.log('─'.repeat(50));
    
    // Display other currencies
    Object.entries(data.Valute)
      .filter(([code]) => !mainCurrencies.includes(code))
      .forEach(([code, currency]) => {
        console.log(`${currency.Name} (${code}): ${currency.Value.toFixed(2)} ₽`);
      });
      
  } catch (error) {
    console.error('Ошибка при получении курсов валют:', error.message);
  }
}

getCurrencyRates();