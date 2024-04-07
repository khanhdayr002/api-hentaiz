exports.name = '/poem/thayboi';
exports.index = async(req, res, next) => {
    try {
        const thayboi = require('./data/thayboi.json');
        var image = thayboi[Math.floor(Math.random() * thayboi.length)].trim();
        res.jsonp({
            data: image,
            count: thayboi.length,
            author: 'Kz Khánhh'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}