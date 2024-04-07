exports.name = '/instagram/searchig';
exports.index = async(req, res, next) => {
const ig = req.query.ig;
if (!ig) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://instagram191.p.rapidapi.com/search/',
  params: {query: ig},
  headers: {
    'X-RapidAPI-Key': '718666fe27msha3d76d92bdc47b1p1b6c5bjsnb96eaa8b5170',
    'X-RapidAPI-Host': 'instagram191.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
  return res.json(response.data)
}).catch(function (error) {
	console.error(error);
});
}