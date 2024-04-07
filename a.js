const request = require('request');
const cheerio = require('cheerio');

const url = '';

request(url, (error, response, body) => {
  if (error) {
    console.error('Lỗi:', error);
    return;XZ/.,MN
  }

  const $ = cheerio.load(body);
  const monitorData = {
    name: $('WEB - Kz API').text(), // Thay 'name' bằng selector chính xác của tên trong HTML
    url: $('https://4dd9ea6e-d5a6-4f8f-892c-ce90e4d539b9-00-11lae77drh9zo.janeway.replit.dev/').text()     // Thay 'url' bằng selector chính xác của URL trong HTML
  };

  console.log('Dữ liệu monitor:', monitorData);
});
