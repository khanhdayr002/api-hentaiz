exports.name = '/imgur';
exports.index = async(req, res, next) => {
    var request = require('request');
    var link = req.query.link;
    if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://api.imgur.com/3/image',
        'headers': {
            'Authorization': 'Client-ID c76eb7edd1459f3'
        },
        formData: {
            'image': link
        }
    };
    request(options, function(error, response) {
        if (error) return res.json({ error: 'Đã xảy ra lỗi với link của bạn' })
        var data = response.body
        var upload = JSON.parse(data)
        res.json({
            uploaded: {
                status: 'success',
                image: upload.data.link
            }
        })
    });
}