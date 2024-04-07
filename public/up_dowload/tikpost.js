exports.name = '/tiktok/postuser';
exports.index = async(req, res, next) => {
  var user = req.query.unique_id;
if (!user) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
  var axios = require('axios');
axios({
    method: 'post',
    url: 'https://www.tikwm.com/api/user/posts',
   data: {    
	unique_id: user
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