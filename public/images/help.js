exports.name = '/images/help';
exports.index = async(req, res, next) => {
    try {
        const girl = require('./data/json/help.json');
        var image = girl[Math.floor(Math.random() * girl.length)].trim();
        res.jsonp({
            data: image,
            count: girl.length,
            author: 'Kz Khánhh'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}