exports.name = '/images/6mui';
exports.index = async(req, res, next) => {
    try {
        const KzGIF = require('./data/json/6mui.json');
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