exports.name = '/game/dhbcv2';
exports.index = async(req, res, next) => {
    const ress = require("./data/dhbc2.json");
    const length1 = ress.doanhinh.length
    const doanhinh = ress.doanhinh[Math.floor(Math.random() * length1)]
    res.json({ author: 'TuanDz', doanhinh })
}