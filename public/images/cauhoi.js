exports.name = '/kinhnghiem';
exports.index = async(req, res, next) => {
    try {
        const girl = require('./data/json/kinhnghiem.json');
        var image = girl[Math.floor(Math.random() * girl.length)].trim();
        res.jsonp({
            url: image,
            data: image,
            count: girl.length,
            author: 'Kz Khánhh'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}