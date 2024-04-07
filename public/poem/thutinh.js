exports.name = '/poem/thutinh';
exports.index = async(req, res, next) => {
    try {
        const thutinh = require('./data/thutinh.json');
        var image = thutinh[Math.floor(Math.random() * thutinh.length)].trim();
        res.jsonp({
            data: image,
            count: thutinh.length,
            author: 'Kz Khánhh'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}