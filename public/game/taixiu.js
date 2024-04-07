exports.name = '/game/taixiu';
exports.index = async(req, res, next) => {
    var images = ['https://i.imgur.com/SLVnMvH.png','https://i.imgur.com/W2EjpLE.png','https://i.imgur.com/ACGVpd1.png','https://i.imgur.com/Z8uEAlj.png','https://i.imgur.com/xtXTVtR.png','https://i.imgur.com/BhEJEbT.png'],
        random_1 = Math.floor(Math.random() * 6) + 1,
        random_2 = Math.floor(Math.random() * 6) + 1,
        random_3 = Math.floor(Math.random() * 6) + 1,
        total = random_1 + random_2 + random_3
    if(total >= 4 && total <= 10) { var result = 'xỉu' }
    else if(total >= 11 && total <= 17) { var result = 'tài'}
    else { var result = false }
    try {
        return res.json({ 
            total: total,
            result: result,
            images: [
                images[random_1-1],
                images[random_2-1],
                images[random_3-1]
            ]
        })
    } catch(e) {
        res.json({ 
            error: 'Đã xảy ra lỗi với yêu cầu của bạn!'
        })
        return console.log(e)
    }
}
