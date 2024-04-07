
exports.name = '/tinyurl';
exports.index = async(req, res, next) => {
var url = req.query.url;
if (!url) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
var axios = require('axios');
axios({
    method: 'post',
    url: 'https://tinyurl.com/api-create.php?url=',
   data: {    
	url: url
	}
})
.then(function (response) {
    var data = response.data
    return res.json({
      url: data,
      author: 'TuanDz'
})
})
      }