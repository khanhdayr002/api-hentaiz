exports.name = '/images/love';
exports.index = async(req, res, next) => {
    try {
        const lovepic = require('./data/json/lovepic.json');
        var image = lovepic[Math.floor(Math.random() * lovepic.length)].trim();
        res.jsonp({
            url: image,
            data: image,
            count: lovepic.length,
            author: 'Kz Khánhh'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}