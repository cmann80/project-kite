const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeWords(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const words = $('table').eq(1).find('td').filter((_, el) => $(el).text().includes('w')).map((_, el) => $(el).text().match(/\b\w*[wW]\w*\b/g)).get().flat();
  fs.writeFileSync('words.json', JSON.stringify(words, null, 2));
}

const url = 'https://www.soybomb.com/tricks/words/';
scrapeWords(url);
