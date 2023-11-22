const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");

// Define the URL of the Wikipedia page
const url = 'https://en.wikipedia.org/wiki/The_Godfather';

// Define a function to extract the names from the HTML content
function extractNames(html) {
  const $ = cheerio.load(html);
  const starring = $('th:contains("Starring")').next().text();
  const names = starring.split('\n').map(name => name.trim()).filter(name => name !== '');
  return names;
}

// Make a GET request to the URL
axios.get(url)
  .then(response => {
    // Extract the names from the response body
    const names = extractNames(response.data);
    // Print the names to the console
    console.log(names);
    fs.writeFileSync('tv-stars.json', JSON.stringify(names));
  })
  .catch(error => {
    // Handle the error if any
    console.error(error);
  });
