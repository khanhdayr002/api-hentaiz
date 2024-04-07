const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, 'data', "bank.json");
exports.name = '/bank/pay';
exports.index = async(req, res, next) => {
	var { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');

	var senderID = req.query.senderID
	var userID = req.query.userID
	var money = req.query.money
	var password = req.query.password
	var STK = req.query.STK
	var type = req.query.type


	if((!type || !senderID || !money || !password) || (!STK && !userID)) return res.json({ status: false, message: 'Thiếu dữ liệu!'});
	var typ = ['STK', 'ID']
	if(typ.includes(type) == false) return res.json({ status: false, message: 'Phương thức chuyển tiền không hợp lệ!'})

	var findTk_1 = dataBank.find(i => i.senderID == senderID)
	var findTk_2 = checkType(type)
	if(!findTk_1) {
		return res.json({
			status: false,
			message: 'Không tìm thấy tài khoản của bạn!'
		})
	}
	if(!findTk_2) {
		return res.json({
			status: false,
			message: 'Không tìm thấy tài khoản của người nhận!'
		})
	}
	if(password !== findTk_1.data.password) {
		return res.json({
			status: false,
			message: 'Sai mật khẩu'
		})
	}
	else {
		var moneyG = findTk_1.data.money
		if(moneyG < money) {
			return res.json({
				status: false,
				message: 'Số dư không đủ để thực hiện giao dịch'
			})
		}
		findTk_1.data.money = findTk_1.data.money - parseInt(money)
		findTk_2.data.money = findTk_2.data.money + parseInt(money)
		writeFileSync(pathData, JSON.stringify(dataBank, null, 4), "utf-8");	
		return res.json({
			status: true,
			message: {
				noti: 'SUCCECS BANK',
				data: {
					senderID: senderID,
					userID: userID,
					message: `💳 STK: ${findTk_1.data.STK}\n» Chuyển tới \n💳 STK: ${findTk_2.data.STK} \n» Số tiền: ${money}$`
				}
			}
		})
	}
	function checkType(type) {
		if(type == 'STK') {
			var check = dataBank.find(i => i.data.STK == STK)
		}
		if(type == 'ID') {
			var check = dataBank.find(i => i.senderID == userID)
		}
		return check;
	}
}