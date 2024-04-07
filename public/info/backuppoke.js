exports.name = '/backuppoke';
exports.index = async (req, res, next) => {
const dataa = require('./data/pokemon/pokemon.json');
var data = [], num = 0;
for (let i of dataa) {
if(i.base.HP !== undefined) {
	data.push({
	ID: num++,
	name: i.name.english,
	type: i.type[0],
	power: {
		HP: i.base.HP,
		Attack: i.base.Attack,
		Defense: i.base.Defense,
		Speed: i.base.Speed
	},
	skill: i.profile.ability,
	coins: (i.base.HP + i.base.Attack + i.base.Defense + i.base.Speed) *100,
	description: i.description,
	images: i.hires
	})
	}
	
}
res.json({ data })
}