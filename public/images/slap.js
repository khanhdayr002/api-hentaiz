exports.name = '/images/slap';
exports.index = async(req, res, next) => {
    try {
        const girl = require('./data/json/slap.json');
        var image = girl[Math.floor(Math.random() * girl.length)].trim();
        res.jsonp({
            url: image,
            count: girl.length,
            author: 'Kz Khánhh'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}