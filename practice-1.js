
// starter code from GPT

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapePurchaseHistory(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const purchaseHistory = $('ul > li').map((_, el) => {
    const [date, ...rest] = $(el).text().split(': ');
    const [item, ...details] = rest.join(': ').split(' for ');
    const [numItems, price] = details[0].split(' ');
    return { date, item, numItems, price };
  }).get();
  fs.writeFileSync('purchase-history.json', JSON.stringify(purchaseHistory));
}

const url = 'https://ideal-pancake-765pg77964gcrv7x-5500.app.github.dev/purchase-history.html';
scrapePurchaseHistory(url);
