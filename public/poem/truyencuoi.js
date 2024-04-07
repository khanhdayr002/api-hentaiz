exports.name = '/poem/truyencuoi';
exports.index = async(req, res, next) => {
    try {
        const truyencuoi = require('./data/truyencuoi.json');
        var image = truyencuoi[Math.floor(Math.random() * truyencuoi.length)].trim();
        res.jsonp({
            data: image,
            count: truyencuoi.length,
            author: 'Kz Khánhh'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}