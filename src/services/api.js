export async function fetchCurrencyRates() {
  const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  if (!response.ok) {
    throw new Error('Ошибка при получении данных');
  }
  return response.json();
}