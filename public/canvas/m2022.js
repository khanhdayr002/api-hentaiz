const fs = require("fs-extra")
const { loadImage, createCanvas, registerFont, Canvas } = require("canvas");
exports.name = '/m2022';
exports.index = async  (req, res, next) => { var
  name       = req.query.name,
  uid         = req.query.uid;
///////////////////////////////////////////////////////////////////////////////////
	if(!name || !uid) return res.json({"messsage":"Thiếu dữ liệu"})

///////////////////////////////////////////////////////////////////////////////////
  let y = await loadImage(__dirname + '/cache/m2022bg.png');
  let avatar = await loadImage((await require("axios").get(`https://graph.facebook.com/v12.0/${uid}/picture?height=240&width=240&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,{ responseType: "arraybuffer" })).data);
  ////////////////////////////Canvas///////////////////////////////////////////////
  registerFont(__dirname+"/cache/UTM Flavour.ttf", {family: "UTM Flavour"});

  var canvas = createCanvas(y.width, y.height);
  var c = canvas.getContext("2d");
  c.drawImage(avatar, 650, 43, 400, 400);
  c.drawImage(y, 0, 0, y.width, y.height);
  c.beginPath();
  c.translate(0, 398);
  c.rotate(Math.PI / 180 * -7);
  c.textAlign = "center";
  c.textBaseline = 'middle';
  c.fillStyle="#fbe589"
  c.shadowColor = "#ffc000";
  c.shadowBlur = 15;
  c.font = "30px UTM Flavour"; //max 15 chữ
  c.fillText(name, y.width/2, 50);

	const Export = canvas.toBuffer();
 // res.sendfile(Export)
  res.type('image/jpeg')                                     
  res.write(Export)
  res.end();
}