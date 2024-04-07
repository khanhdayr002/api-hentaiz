exports.name = '/images/ppcouple';
exports.index = async(req, res, next) => {
const resp = require("./data/json/ppcouple.json");
const length = resp.length
return res.json({ 
  author: 'Kz Khánhh',
	url: resp[Math.floor(Math.random() * length)]
 })
}