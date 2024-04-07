exports.name = '/game/dhbcv3';
exports.index = async(req, res, next) => {
const resp = require("./data/dhbc3.json");
const length = resp.length
return res.json({ 
  author: 'TuanDeepTry',
	data: resp[Math.floor(Math.random() * length)]
 })
}