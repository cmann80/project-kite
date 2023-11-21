// starter code from GPT

import axios from 'axios';
import cheerio from 'cheerio';

async function scrapePurchaseHistory(url: string): Promise<string[]> {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const purchaseHistory = $('div.purchase-history').text().split('\n');
  return purchaseHistory.filter((item) => item.trim() !== '');
}

const url = 'https://example.com/purchase-history';
const purchaseHistory = await scrapePurchaseHistory(url);
console.log(purchaseHistory);