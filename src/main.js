import './style.css';
import { fetchCurrencyRates } from './services/api.js';
import { renderCurrencyRates } from './ui/renderer.js';

async function init() {
  try {
    const data = await fetchCurrencyRates();
    renderCurrencyRates(data);
  } catch (error) {
    document.getElementById('app').innerHTML = `
      <div class="error">
        Ошибка при получении курсов валют: ${error.message}
      </div>
    `;
  }
}

init();