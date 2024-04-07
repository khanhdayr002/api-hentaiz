exports.name = '/tarot';
exports.index = async(req, res, next) => {
    let dirPath = __dirname + `/data/tarot.json`;
    return res.sendFile(dirPath)
}