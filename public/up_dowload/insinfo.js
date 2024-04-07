exports.name = '/instagram/infouser';
exports.index = async(req, res, next) => {
const ig = req.query.ig;
if (!ig) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://instagram210.p.rapidapi.com/ig_profile',
  params: {ig: ig},
  headers: {
    'X-RapidAPI-Key': 'a1195f61acmsh6a9dad0b9230160p12c85fjsnde352bd0fbcd',
    'X-RapidAPI-Host': 'instagram210.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
  return res.json(response.data)
}).catch(function (error) {
	console.error(error);
});
}