exports.name = '/tiktok/postuserv2';
exports.index = async(req, res, next) => {
const user = req.query.unique_id;
if (!user) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
const axios = require("axios");
 const keyAPi = ['aefdb0602bmsh108794901717a46p1633c1jsn158e610f3ec7', 'b258ef723fmsh6e1c717e4da8c55p1a6aa6jsn0b568acec4ba', '2cc687a09fmsh03d743f2aa512a8p10abdcjsn78953f7f18eb', '1d37e77a02mshf3a6c1b1595c733p1a1bb5jsn95a79657b66a', '57f9a2103emshb5be9d95c8964bdp1d3620jsnd6716f0c155b', '250976cf63msh6da47b4f04c0fb2p199701jsn7f1e0a8fbd11', '5099af6297msh5cc9c6524d30a94p10d307jsn003307a68755', 'aea50f9b26msh5d25474550daf0ap1a6537jsncc77ca7a71b5',]
    var keyRandom = keyAPi[Math.floor(Math.random() * keyAPi.length)];

const options = {
  method: 'GET',
  url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/user/posts',
  data: {unique_id: user, count: '94'},
  headers: {
    'X-RapidAPI-Key': keyRandom,
    'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
  return res.json(response.data)
}).catch(function (error) {
	console.error(error);
});
}