const fs = require("fs-extra")
const { loadImage, createCanvas, registerFont, Canvas } = require("canvas");
exports.name = '/anhbia';
exports.index = async  (req, res, next) => { var
  t1     = req.query.name,
  t2     = req.query.age;
///////////////////////////////////////////////////////////////////////////////////
	if(!t1 || !t2) return res.json({"messsage":"Thiếu dữ liệu"})
                                      ///////////////////////////////////////////////////////////////////////////////////
	let path1 = __dirname + '/cache/anh-bia-glitch.jpg'; // Lấy background
  let bg1   = await loadImage(path1);
  ////////////////////////////Canvas///////////////////////////////////////////////
  registerFont(__dirname+"/cache/SVN-DHF Dexsar Brush.ttf", {family: "SVN-DHF Dexsar Brush"});
  registerFont(__dirname+"/cache/arial.ttf", {family: "arial"});
  

 cochu = 150;
 var m = createCanvas(bg1.width, bg1.height);
 var n = m.getContext("2d");
 n.clearRect(0, 0, m.width, m.height);
 n.save();
 n.globalAlpha = 0.5;
 n.drawImage(bg1, 0, 0, m.width, m.height);
 n.restore();
 var a = t1.length;
 var b = t2.length;
 n.save();
 n.globalCompositeOperation = "lighten";
 n.fillStyle = "red";
 n.font = cochu + "px SVN-DHF Dexsar Brush";
 var l = t1.toUpperCase();
 var c = n.measureText(l).width;
 n.fillText(l, (m.width / 2) - (c / 2) + 7, 350);
 n.restore();
 n.save();
 n.globalCompositeOperation = "lighten";
 n.fillStyle = "cyan";
 n.font = cochu + "px SVN-DHF Dexsar Brush";
 var l = t1.toUpperCase();
 var c = n.measureText(l).width;
 n.fillText(l, (m.width / 2) - (c / 2) - 7, 350);
 n.restore();
 n.save();
 n.fillStyle = "white";
 n.font = cochu + "px SVN-DHF Dexsar Brush";
 var l = t1.toUpperCase();
 var c = n.measureText(l).width;
 n.fillText(l, (m.width / 2) - (c / 2), 350);
 n.restore();
 n.save();
 n.fillStyle = "#fca0a0";
 n.font = "28px arial";
 var c = n.measureText(t2).width;
 n.fillText(t2, (m.width / 2) - (c / 2) - 2, 430);
 n.restore();
 n.save();
 n.fillStyle = "white";
 n.font = "28px arial";
 var c = n.measureText(t2).width;
 n.fillText(t2, (m.width / 2) - (c / 2), 430);
 n.restore();

	const Export = m.toBuffer();
 // res.sendfile(Export)
  res.type('image/jpeg')                                    
  res.write(Export)
  res.end();
}