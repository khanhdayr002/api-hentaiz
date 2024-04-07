const fs = require("fs-extra")
const { loadImage, createCanvas, registerFont, Canvas } = require("canvas");
exports.name = '/bannertc2';
exports.index = async  (req, res, next) => { var
  age         = req.query.age,
  name        = req.query.name,
  text        = req.query.text;
///////////////////////////////////////////////////////////////////////////////////
	if(!age || !name || !text) return res.json({"messsage":"Thiếu dữ liệu"})
///////////////////////////////////////////////////////////////////////////////////
	let path1 = __dirname + '/cache/layer.png', // Lấy background
	    path2 = __dirname + '/cache/tym1.png',
      path3 = __dirname + '/cache/tym2.png'; // Lấy background
  let bg1   = await loadImage(path1),
      bg2   = await loadImage(path2),
      bg3   = await loadImage(path3);


  ////////////////////////////Canvas///////////////////////////////////////////////
  registerFont(__dirname+"/cache/Dutch Brigade.ttf", {family: "DutchBrigade"});
  registerFont(__dirname+"/cache/Signature Collection.ttf", {family: "Signature Collection"});
  registerFont(__dirname+"/cache/UTM Avo.ttf", {family: "UTM Avo"});

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
  var name = xoa_dau(name);
  var canvas = createCanvas(bg1.width, bg1.height);
  var r = canvas.getContext("2d");

 r.clearRect(0, 0, 1700, 647);
 r.save();
 r.fillStyle = "#fff";
 r.fillRect(0, 0, 1700, 647);
 r.restore();
 r.font = "200px DutchBrigade";
 r.fillStyle = "black";
 var p = 1700 / 2;
 var o = 360;
 r.save();
 r.textAlign = "center";
 r.strokeStyle = "black";
 r.lineWidth = 22;
 r.lineJoin = "round";
 r.miterLimit = 2;
 r.strokeText(age, p, o);
 r.fillText(age, p, o);
 var m = r.measureText(age).width;
 console.log(m);
 r.restore();
 r.save();
 r.textAlign = "center";
 r.strokeStyle = "white";
 r.lineWidth = 10;
 r.lineJoin = "round";
 r.miterLimit = 2;
 r.strokeText(age, p, o);
 r.fillText(age, p, o);
 r.restore();
 r.save();
 r.font = "80px Signature Collection";
 r.textAlign = "center";
 r.textBaseline = "middle";
 r.translate(1700 / 2, 312);
 r.rotate(Math.PI / 180 * -15);
 r.shadowColor = "white";
 r.shadowBlur = 5;
 r.strokeStyle = "white";
 r.lineWidth = 16;
 r.lineJoin = "round";
 r.miterLimit = 2;
 r.strokeText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.fillText(name, 0, 0);
 r.restore();
 r.save();
 r.drawImage(bg1, 0, 0);
 r.drawImage(bg2, 1700 / 2 - m / 2 - 100, 250);
 r.drawImage(bg3, 1700 / 2 + m / 2 + 10, 190);
 r.restore();
 r.save();
 r.font = "27px UTM Avo";
 var p = 1700 / 2;
 var o = 450;
 var q = 30;
 var s = text.split("\n");
 r.textAlign = "center";
 for (var l = 0; l < s.length; l++) {
 r.fillText(s[l], p, o + (l * q))
 }
 r.restore();

	const Export = canvas.toBuffer();
 // res.sendfile(Export)
     res.type('image/jpeg')                                       
  res.write(Export)
  res.end();
}