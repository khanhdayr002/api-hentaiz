const fs = require("fs-extra")
const { loadImage, createCanvas, registerFont, Canvas } = require("canvas");
exports.name = '/hn2022';
exports.index = async  (req, res, next) => { var
  kieu        = req.query.kieu,
  iname       = req.query.name,
  uid         = req.query.uid;
///////////////////////////////////////////////////////////////////////////////////

	if(!kieu || !iname || !uid) return res.json({"messsage":"Thiếu Dữ Liệu"})
///////////////////////////////////////////////////////////////////////////////////
	let ibg1 = __dirname + '/cache/1.jpg', // Lấy background
	    ibg2 = __dirname + '/cache/2.jpg'; // Lấy background
  let icimg = (await require("axios").get(`https://graph.facebook.com/v12.0/${uid}/picture?height=240&width=240&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,{ responseType:"arraybuffer" })).data;
  let bg1 = await loadImage(ibg1),
      bg2 = await loadImage(ibg2),
      cimg = await loadImage(icimg);
  ////////////////////////////Canvas///////////////////////////////////////////////
  registerFont(__dirname+"/cache/UTM ThuPhap Thien An.ttf", {family: "UTM ThuPhap Thien An"});
  var canvas = createCanvas(bg1.width, bg1.height);
  var n = canvas.getContext("2d");
 n.clearRect(0, 0, canvas.width, canvas.height);
 n.save();
 var e = n.createLinearGradient(0, 0, 900, 0);
 e.addColorStop(0, "#c99330");
 e.addColorStop(0.5, "#f8ce64");
 e.addColorStop(1, "#c99330");
 n.fillStyle = e;
 n.fillRect(0,0,canvas.width,canvas.height);
 n.restore();
 n.globalCompositeOperation  ="destination-atop"
 n.save();
 var f = n.measureText(iname).width;
 n.textAlign="center";

 textMaxWidth(iname, "UTM ThuPhap Thien An", 1350,740,125,canvas,n);
 function textMaxWidth(text, font, top,maxw,maxf,can,ctx) {
 do { maxf--;
 ctx.font = maxf + "px " + font
 } while (ctx.measureText(iname).width > maxw);
 ctx.fillText(iname, can.width / 2, top)
 }       
 n.restore();
 n.save();

  if (kieu == '1') {
    n.drawImage(bg1, 0, 0, canvas.width, canvas.height);
    d = 475
  }

  if (kieu == '2') {
    n.drawImage(bg2, 0, 0, canvas.width, canvas.height);
    d = 570
  }

 n.restore();
 n.globalCompositeOperation = "source-over";
 n.save();
 avtw = 460;
 n.translate(canvas.width/2 - avtw/2, d);
 n.beginPath();
 n.arc(avtw/2, avtw/2, avtw/2, 0, Math.PI * 2, true);
 n.closePath();
 n.clip();
 n.drawImage(cimg, 0, 0, avtw, avtw);
 n.restore();

	const Export = canvas.toBuffer();
 // res.sendfile(Export)
  res.type('image/jpeg')                                     
  res.write(Export)
  res.end();
}