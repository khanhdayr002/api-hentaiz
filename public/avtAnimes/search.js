const stringSimilarity = require('string-similarity');
exports.name = '/taoanhdep/search';
exports.index = async(req, res, next) => {
    const fs = require('fs-extra');
    let dirPath = __dirname + `/data/list_anime.json`;
    var list_anime = (fs.readFileSync(dirPath, "utf-8"));
    var listt = JSON.parse(list_anime);

    let dirPath2 = __dirname + `/data/data_anime.json`;
    var data_anime = (fs.readFileSync(dirPath2, "utf-8"));
    var avtAnimee = JSON.parse(data_anime);

    var dataList = listt.listAnime
    var lengthID = [];
    var msgg = []
    for (let id of avtAnimee) {
        lengthID.push(id.imgAnime)
        const text3 = id.imgAnime.split("s0/").pop()
        const text1 = text3.substr(0, text3.indexOf('.'));
        msgg.push(text1.charAt(0).toUpperCase() + text1.slice(1).replace("-", " "))
    }
    var url = req.query.key;
    if (!url) return res.jsonp({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
    var checker = stringSimilarity.findBestMatch(url, msgg)
    if (checker.bestMatch.rating >= 1) s = checker.bestMatch.target;
    var search = checker.bestMatch.target;
    var search = {
        name: checker.bestMatch.target,
        ID: (dataList.find(c => c.name == search)).ID,
        color: (dataList.find(c => c.name == search)).color,
    }
    res.json({ search })
}