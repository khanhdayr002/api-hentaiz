
const fs = require("fs-extra")
const { loadImage, createCanvas, registerFont, Canvas } = require("canvas");
const token = '6628568379%7Cc1e620fa708a1d5696fb991c1bde5662';
exports.name = '/tichxanh';
exports.index = async (req, res, next) => { var
  kieu   = req.query.kieu,
  uid    = req.query.uid,
  name   = req.query.name;
///////////////////////////////////////////////////////////////////////////////////
	if(!kieu || !uid || !name) return res.json({"messsage":"Thiếu dữ liệu"})
///////////////////////////////////////////////////////////////////////////////////
  let bg1 = await loadImage(__dirname + '/cache/1.png');
  ////////////////////////////Canvas///////////////////////////////////////////////
  registerFont(__dirname+"/cache/AR DARLING.ttf", {family: "AR DARLING"});
  registerFont(__dirname+"/cache/Scripture.ttf", {family: "Scripture"});
  var d = createCanvas(bg1.width, bg1.height);
  var g = d.getContext("2d");
  if (kieu == "1") { c = bg1 }
  if (kieu == "2") { c = await loadImage(__dirname + '/cache/2.png') }

  g.drawImage(await loadImage((await require("axios").get(`https://graph.facebook.com/v12.0/${uid}/picture?height=240&width=240&access_token=${token}`,{responseType:"arraybuffer"})).data), d.width / 2 - 1640 / 2, d.height / 2 - 1640 / 2, 1640, 1640);
  g.drawImage(await loadImage(__dirname + '/cache/overlay.png'), 0, 0, d.width, d.height);
  g.drawImage(c, 0, 0, d.width, d.height);
	const Export = d.toBuffer();
                                           res.type('image/jpeg')    
  res.write(Export)
  res.end();
    
}