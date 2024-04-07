exports.name = '/tad';
exports.index = async(req, res, next) => {
var color_1 = req.query.color1;
    var color_2  = req.query.color2;
    var ten_chinh = req.query.tenchinh
    var ten_phu = req.query.ten_phu
    if( !color_1 || !color_2){
      var color_1 = "#32a852",
        color_2 = "blue"
    }
    if( !ten_chinh || !ten_phu){
      var ten_chinh = "",
        ten_phu = ""
    }
    const fs = require('fs-extra');
    const { loadImage, createCanvas } = require("canvas");
    const request = require('request');
    const path = require('path');
    const axios = require('axios');
    const Canvas = require('canvas');
    let pathImg = __dirname + `/tad/avatar_1_2.png`;
    let background = (await axios.get(encodeURI(`https://lh3.googleusercontent.com/-fJXKeIC8E2w/YY-PQO_pOzI/AAAAAAAA0rg/clQv41eetT0e3d1LZS6lgxuZ8ARbnzuywCNcBGAsYHQ/s0/Logo-block.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    if (!fs.existsSync(__dirname +
      `/tad/SVN-Revolution.ttf`)) {
      let getfont = (await axios.get(`https://github.com/quyenkaneki/font/blob/main/SVN-Revolution.ttf?raw=true`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/SVN-Revolution.ttf`, Buffer.from(getfont, "utf-8"));
    };
    let a = await loadImage(pathImg);
    let canvas = createCanvas(a.width, a.height);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.save();

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";

    ctx.drawImage(a, 0, 0, canvas.width, canvas.height);

    ctx.save();
    Canvas.registerFont(__dirname + `/tad/SVN-Revolution.ttf`, {
      family: "SVN-Revolution"
    });
    ctx.textAlign = "center";
    ctx.font = "300px SVN-Revolution";
    ctx.fillText(ten_phu, canvas.width / 2, 1450);
    ctx.restore();

    ctx.save();
    Canvas.registerFont(__dirname + `/tad/SVN-Revolution.ttf`, {
      family: "SVN-Revolution"
    });
    ctx.textAlign = "center";
    ctx.font = "100px SVN-Revolution";
    ctx.fillText(ten_chinh, canvas.width / 2, 1650);
    ctx.restore();

    ctx.restore();

    ctx.globalCompositeOperation = "destination-over";
    var gradient2 = ctx.createLinearGradient(0, 0, 0, 2000);
    gradient2.addColorStop(0, `${color_1}`);
    gradient2.addColorStop(1, `${color_2}`);
    ctx.fillStyle = gradient2;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    res.set({ "Content-Type": "image/png" })
    res.send(canvas.toBuffer())
}