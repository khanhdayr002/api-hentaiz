exports.name = '/game/dovuilq';
exports.index = async(req, res, next) => {
const resp = require("./data/dovuilq.json");
const length = resp.length
return res.json({ 
	author: 'TuanDz',
	data: resp[Math.floor(Math.random() * length)]
 })
}