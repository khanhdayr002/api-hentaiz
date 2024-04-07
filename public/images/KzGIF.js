exports.name = '/images/KzGIF';
exports.index = async(req, res, next) => {
    try {
        const KzGIF = require('./data/json/KzGIF.json');
        var image = KzGIF[Math.floor(Math.random() * KzGIF.length)].trim();
        res.jsonp({
            url: image,
            data: image,
            count: KzGIF.length,
            author: 'Kz Khánhh'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}