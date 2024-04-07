const router = require("express").Router();
const fs = require("fs-extra")
const { loadImage, createCanvas, registerFont, Canvas } = require("canvas");
const token = '6628568379%7Cc1e620fa708a1d5696fb991c1bde5662';
exports.name = '/mkt';
exports.index = async  (req, res, next) => { var
  text1  = req.query.text1,
  text2  = req.query.text2,
  fb     = req.query.fb,
  ma     = req.query.ma,
  tl     = req.query.tl,
  lc     = req.query.lc,
  uid    = req.query.uid;
///////////////////////////////////////////////////////////////////////////////////
	if(!text1 || !text2 || !fb || !ma || !tl || !lc || !uid) return 
///////////////////////////////////////////////////////////////////////////////////
  let y = await loadImage(__dirname + '/cache/mkt.png');
  ////////////////////////////Canvas///////////////////////////////////////////////
  registerFont(__dirname+"/cache/Fester-Bold.ttf", {family: "Fester"});
  registerFont(__dirname+"/cache/UTM Avo.ttf", {family: "UTM Avo"});

  var canvas = createCanvas(y.width, y.height);
  var E = canvas.getContext("2d");

  E.clearRect(0, 0, y.width, y.height);
  E.save();

  E.drawImage(await loadImage((await require("axios").get(`https://graph.facebook.com/v12.0/${uid}/picture?height=240&width=240&access_token=${token}`,{ responseType: "arraybuffer" })).data), 725, 142, 255, 255);
  E.save();

  E.drawImage(y, 0, 0, y.width, y.height);
  E.globalCompositeOperation = "destination-out";
  E.save();

  E.font = "900 55px iCiel Fester Semi-Condensed";
  E.fillText(text1, 50, 280);
  E.restore();
  E.save();

  E.font = "900 30px iCiel Fester Semi-Condensed";
  E.fillText(text2, 50, 330);
  E.restore();
  E.save();

  E.font = "23px UTM Avo";
  E.fillStyle = "#000";
  E.fillText(fb, 400, 510);
  E.fillText(ma, 737, 510);
  E.fillText(tl, 1075, 510);
  E.fillText(lc, 1413, 510);
  E.restore();
  E.save();

  E.font = "900 30px iCiel Fester Semi-Condensed";
  E.textAlign = "right";
  var z = y.width - 50;
  var D = 330;
  var G = 40;
  var A = "TuanDz".split("\n").reverse();
  for (var C = 0; C < A.length; C++) {
    E.fillText(A[C], z, D - (C * G))
  }
  E.restore();
  E.save();

  E.globalCompositeOperation = "destination-over";
  var B = E.createLinearGradient(0, 0, 1702, 0);
  B.addColorStop(0, '#4776e6');
  B.addColorStop(1, '#8e54e9');
  E.fillStyle = B;
  E.fillRect(0, 0, y.width, y.height);
  E.beginPath();// Xuất file
	const Export = canvas.toBuffer();
 // res.sendfile(Export)
  res.type('image/jpeg')    
  res.write(Export)
  res.end();
}