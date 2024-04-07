const fs = require("fs-extra")
const { loadImage, createCanvas, registerFont, Canvas } = require("canvas");
exports.name = '/ggsaid';
exports.index = async  (req, res, next) => {
  name = req.query.name;
//////////////////////////////////////////////////////////////////////////////////  
///////////////////////////////////////////////////////////////////////////////////
	let path = __dirname + '/cache/bg.jpg'; // Lấy background
  let bg   = await loadImage(path);
  registerFont(__dirname+"/cache/arial.ttf", {family: "arial"});

  function rd(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  nghe = ['Lập trình', 'Thợ sửa ống nước', 'Hacker', 'Cài win dạo', 'Hót rác', 'Hót phân', 'Trân nuôi', 'Dịch vụ facebook', 'Ăn bám bố mẹ', 'Học hành', 'Trần Duy Hưng', 'Cấy'];
  
  xe = ['BMW', 'DREAM', 'Xe đạp', 'Trực thăng', 'SH', 'WAVE A', 'SUZUKI', 'Boing 747'];

  var A = createCanvas( bg.width, bg.height);
  var B = A.getContext("2d");
	B.drawImage(bg, 0, 0, A.width, A.height);
  B.font = "35px arial";
  B.fillStyle = "rgba(0,0,0,.87)";
  B.fillText("Số phận của: " + name, 130, 185);
  B.fillStyle = "#70757a";
  B.fillText("Kết hôn lúc: " + rd(16, 35) + " tuổi", 50, 400);
  B.fillText("Con cái: " + rd(0, 3) + " con gái và " + rd(0, 3) + " con trai", 50, 450);
  B.fillText("Nghề nghiệp: " + nghe[Math.floor(Math.random() * nghe.length)].trim(), 50, 500);
  B.fillText("Xe: " + xe[Math.floor(Math.random() * xe.length)].trim(), 50, 550);
  B.fillText("Từ trần lúc: " + rd(20, 105), 50, 600);
  let tot = rd(0, 99999);
  let xau = rd(0, 99999);
  if (tot < xau) {
    noiden = "Địa Ngục"
  } else {
    noiden = "Thiên đường"
  };
  B.fillText("Việc làm tốt: " + tot, 50, 650);
  B.fillText("Việc làm xấu: " + xau, 50, 700);
  B.fillText("Nơi đến: " + noiden, 50, 750);
	const C = A.toBuffer();
  res.type('image/jpeg')
  res.write(C)
  res.end()
}

