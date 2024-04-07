exports.name = '/tiktok/downloadvideo';
exports.index = async(req, res, next) => {
var link = req.query.url;
if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
var axios = require('axios');
axios({
    method: 'post',
    url: 'https://www.tikwm.com/api/?url=' + link + '?hd=1',
    data: {    
	url: link
	}
})
.then(function (response) {
    var data = response.data
    console.log(data)
    return res.json(data)
})
.catch(function (error) {
    return res.json({ error });
});
}