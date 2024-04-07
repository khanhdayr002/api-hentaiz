
const fs = require("fs-extra")
const { loadImage, createCanvas, registerFont, Canvas } = require("canvas");
exports.name = '/moon';
exports.index = async (req, res, next) => { var
  a      = req.query.name,
  ngay   = req.query.ngay,
  thang  = req.query.thang,
  nam    = req.query.nam;
                                          
///////////////////////////////////////////////////////////////////////////////////
	if(!a || !ngay || !thang || !nam) return res.json({"messsage":"Thiếu dữ liệu"})
///////////////////////////////////////////////////////////////////////////////////
  let bg2   = await loadImage('https://i.imgur.com/5gLepJ8.jpg');                                 

  ////////////////////////////Canvas///////////////////////////////////////////////
  registerFont(__dirname+"/cache/AmaticSCbold.ttf", {family: "AmaticSCbold"});
  registerFont(__dirname+"/cache/AmaticSC.ttf", {family: "AmaticSC"});

function juliandate(i, a, k) {
    var i, a, k;
    var b, g;
    var h, f, e;
    var c;
    g = k - Math.floor((12 - a) / 10) + 1;
    b = a + 9;
    if (b >= 12) {
        b = b - 12
    }
    h = Math.floor(365.25 * (g + 4712));
    f = Math.floor(30.6001 * b + 0.5);
    e = Math.floor(Math.floor((g / 100) + 49) * 0.75) - 38;
    c = h + f + i + 59;
    if (c > 2299160) {
        c = c - e
    }
    return c;
}

function getmoon() {
    var c;
    var e, b;
    c = juliandate(ngay, thang, nam);
    e = (c + 4.867) / 29.53059;
    e = e - Math.floor(e);
    if (e < 0.5) {
        b = e * 29.53059 + 29.53059 / 2
    } else {
        b = e * 29.53059 - 29.53059 / 2
    }
    b = Math.floor(b) + 1;
    return "https://cdn.taoanhdep.com/tad/effect/wall-moon/trang/" + Math.round(b.toString() / 2) + ".jpg"
}
                                          
function getAge() {
  var f = ngay;
  var a = thang;
  var g = nam;
  if (f < 10) {
     f = "0" + f
  }
  if (a < 10) {
      a = "0" + a
  }
  return f + "/" + a + "/" + g;
}

var d = createCanvas(bg2.width, bg2.height);
var m = d.getContext("2d");
m.save();
m.fillStyle = "#000";
m.fillRect(0, 0, d.width, d.height);
m.restore();
m.save();
m.textAlign = "center";
var i = d.width * 0.8;
try{
let bg1 = await loadImage((await require("axios").get(getmoon(),{ responseType: "arraybuffer" })).data);
var checkage = "false";
m.drawImage(bg1, d.width / 2 - i / 2, d.height / 2 - i / 2, i, i);
m.fillStyle = "#fff";
m.shadowColor = "#fff";
m.shadowBlur = 30;
m.font = "130px AmaticSCbold";
m.fillText(a, d.width / 2, 1500);
m.shadowBlur = 50;
m.shadowBlur = 30;
m.font = "70px AmaticSC";
m.fillText("- " + getAge() + " -", d.width / 2, 1600)
}catch{
m.fillStyle = "#fff";
m.shadowColor = "#fff";
m.shadowBlur = 30;
m.font = "130px AmaticSCbold";
m.fillText(a, d.width / 2, 1500);
m.shadowBlur = 50;
m.shadowBlur = 30;
m.font = "70px AmaticSC";
m.fillText("- Năm sinh không được chứa ký tự đặc biệt", d.width / 2, 1600)
}
m.restore();
m.save();
m.globalCompositeOperation = "screen";
m.drawImage(bg2, 0, 0, d.width, d.height);
m.restore()

const Export = d.toBuffer();
  res.type('image/jpeg')
  res.write(Export)
  res.end();
}