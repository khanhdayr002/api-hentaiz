exports.name = '/poem/chamngon';
exports.index = async(req, res, next) => {
    try {
        const love = require('./data/chamngon.json');
        var image = love[Math.floor(Math.random() * love.length)].trim();
        res.jsonp({
            data: image,
            count: love.length,
            author: 'Kz Khánhh'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}