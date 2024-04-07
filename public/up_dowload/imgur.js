const fs = require("fs");
const request = require('request');

exports.name = '/imgurupload';
exports.index = async(req, res, next) => {
    var link = req.query.link;
    if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
    const { path, type } = await dl(link);
    var options = {
        'method': 'POST',
        'url': 'https://api.imgur.com/3/upload',
        'headers': {
            'Authorization': 'Client-ID c76eb7edd1459f3'
        }
    };

    options.formData = type == "video" ? {'video': fs.createReadStream(path)} : {'image': fs.createReadStream(path)}
    request(options, function(error, response) {
        if (error) return res.json({ error: 'Đã xảy ra lỗi với link của bạn' })
        var linkk = response.body
        var upload = JSON.parse(linkk)
        fs.unlinkSync(path);
        res.json({
            uploaded: {
                status: 'success',
                image: upload.data.link
            }
        })
    });
}

async function dl(url) {
  return new Promise((rs, rj) => {
  let path;
    request(url).on('response', function (response) {
      const ext = response.headers['content-type'].split('/')[1];
      
      path = __dirname + `/cache/${Date.now()}.${ext}`;
      response
        .pipe(fs.createWriteStream(path))
        .on('finish', () => {
          rs({ path, type: response.headers['content-type'].split('/')[0] })
        })
    })
});
}