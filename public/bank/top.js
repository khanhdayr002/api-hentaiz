const dataBank = require('./data/bank.json')
exports.name = '/bank/top';
exports.index = async(req, res, next) => {
    if(dataBank.length == 0) return res.json({ status: false, message: 'Ngân hàng chưa có người dùng'})
    var top = dataBank.sort((a, b) => b.data.money - a.data.money)
    console.log(top)
    var topBank = [];
    for (var i = 0; i < 10; i++) {
        if(!top[i]) continue;
        topBank.push({
            rank: i+1,
            name: top[i].name,
            STK: top[i].data.STK,
            money: top[i].data.money
        })
    }
    return res.json({
        status: true,
        message: `| 𝗧𝗢𝗣 ${topBank.length} 𝗚𝗜𝗔̀𝗨 𝗡𝗛𝗔̂́𝗧 𝗕𝗔𝗡𝗞 |`,
        ranking: topBank
    })
}