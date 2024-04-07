exports.name = '/instagram/downloadpost';
exports.index = async(req, res, next) => {
const url = req.query.url;
if (!url) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://instagram-looter2.p.rapidapi.com/id',
  params: {
    username: 'abdallhdev'
  },
  headers: {
    'X-RapidAPI-Key': '950508b8eamsh49c883b8dd1bdfbp1e223cjsne14bff897b35',
    'X-RapidAPI-Host': 'instagram-looter2.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

axios.request(options).then(function (response) {
	console.log(response.data);
  return res.json(response.data)
}).catch(function (error) {
	console.error(error);
});
}