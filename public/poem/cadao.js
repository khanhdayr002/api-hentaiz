exports.name = '/poem/cadao';
exports.index = async(req, res, next) => {
    try {
        const cadao = require('./data/cadao.json');
        var image = cadao[Math.floor(Math.random() * cadao.length)].trim();
        res.jsonp({
            data: image,
            count: cadao.length,
            author: 'Kz Khánhh'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}