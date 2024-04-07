const fs = require("fs-extra")
const { loadImage, createCanvas, registerFont, Canvas } = require("canvas");
exports.name = '/bannertc';
exports.index = async  (req, res, next) => { var
  kieu   = req.query.kieu,
  age    = req.query.age,
  name   = req.query.name;
///////////////////////////////////////////////////////////////////////////////////
	if(!kieu || !age || !name) return res.json({"messsage":"Thiếu dữ liệu"})
///////////////////////////////////////////////////////////////////////////////////
  let bg1   = await loadImage('https://i.imgur.com/GSLNFX0.png');
      bg2   = await loadImage('https://i.imgur.com/CEQ0e0E.png');

  ////////////////////////////Canvas///////////////////////////////////////////////
  registerFont(__dirname+"/cache/AR DARLING.ttf", {family: "AR DARLING"});
  registerFont(__dirname+"/cache/Scripture.ttf", {family: "Scripture"});
  
  function xoa_dau(name) {
  name = name
	.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
	.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
	.replace(/ì|í|ị|ỉ|ĩ/g, "i")
	.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
	.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
	.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
	.replace(/đ/g, "d")
	.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
	.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
	.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
	.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
	.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
	.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
	.replace(/Đ/g, "D");
	return name
  }

  var canvas = createCanvas(bg1.width, bg1.height);
  var e = canvas.getContext("2d");
  if (kieu == "1") {
    m = "#000";
    f = "#fff";
    bg = bg1
  }
  if (kieu == "2") {
    m = "#fff"
    f = "#000";
    bg = bg2
  }
e.fillStyle = m
e.fillRect(0, 0, canvas.width, canvas.height);
e.restore();
e.save();
e.font = "115px AR DARLING";
e.fillStyle = f;
e.translate(710, 210);
e.rotate(Math.PI / 180 * -1);
e.fillText(age, 0, 0);
e.restore();
e.save();
e.font = "55px Scripture";
e.fillStyle = f;
e.translate(860, 290);
e.rotate(Math.PI / 180 * -8);
e.fillText(xoa_dau(name), 0, 0);
e.restore();
e.drawImage(bg, 0, 0);

	const Export = canvas.toBuffer();
 // res.sendfile(Export)
  res.type('image/jpeg')                                     
  res.write(Export)
  res.end();
}