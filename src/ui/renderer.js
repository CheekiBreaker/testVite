import { formatDate, formatCurrency } from '../utils/formatters.js';
import { MAIN_CURRENCIES } from '../utils/constants.js';

export function renderCurrencyRates(data) {
  renderDate(data.Date);
  renderMainCurrencies(data.Valute);
  renderOtherCurrencies(data.Valute);
}

function renderDate(date) {
  document.getElementById('date').textContent = `на ${formatDate(date)}`;
}

function renderMainCurrencies(valute) {
  const container = document.querySelector('#main-currencies .currencies-grid');
  MAIN_CURRENCIES.forEach(code => {
    const currency = valute[code];
    container.appendChild(createCurrencyCard(currency, true));
  });
}

function renderOtherCurrencies(valute) {
  const container = document.querySelector('#other-currencies .currencies-grid');
  Object.entries(valute)
    .filter(([code]) => !MAIN_CURRENCIES.includes(code))
    .forEach(([_, currency]) => {
      container.appendChild(createCurrencyCard(currency, false));
    });
}

function createCurrencyCard(currency, showChange) {
  const card = document.createElement('div');
  card.className = 'currency-card';
  
  const change = currency.Value - currency.Previous;
  const changeSymbol = change > 0 ? '↑' : change < 0 ? '↓' : '=';
  const changeClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
  
  card.innerHTML = `
    <div class="currency-name">${currency.Name} (${currency.CharCode})</div>
    <div class="currency-value">${formatCurrency(currency.Value)} ₽</div>
    ${showChange ? `
      <div class="currency-change ${changeClass}">
        ${changeSymbol} ${Math.abs(change).toFixed(2)} ₽
      </div>
    ` : ''}
  `;
  
  return card;
}