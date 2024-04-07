exports.name = '/cardinfo';
exports.index = async(req, res, next) => {
const fontsLink = 40
    const fontsInfo = 40
    const fontchuky = 60
    const fontsname = 150
    const fontuid = 70
    const colorName = "#00FF00"
    const request = require('request')
    const fs = require('fs-extra');
    const axios = require('axios');
    const Canvas = require('canvas');
    const { location, name, gender, vanity, uid, chuky } = req.query;
    if (!location || !name || !gender || !vanity || !uid || !chuky) {
      return res.json({
        error: 'Thiếu dữ liệu để thực hiện chương trình tạo ảnh!',
        example: {
          message: "https://API-TuanDzz.ducdz999.repl.co/cardinfo?location=Hưng Yên&name=Công Quyền&gender=nam&vanity=kaneki&uid=100040984926932"
        }
      })
    }
    else {
      async function circle(image) {
        const jimp = require('jimp');
        image = await jimp.read(image);
        image.circle();
        return await image.getBufferAsync("image/png");
      }
      const {
        loadImage,
        createCanvas
      } = Canvas;
      let pathImg = __dirname + `/cache/${uid}456.png`;
      let pathkavt = __dirname + `/cache/${uid}457.png`;
      let pathAvata = __dirname + `/cache/avtuserrd.png`;
      let getAvatarOne = (await axios.get(`https://graph.facebook.com/${uid}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662 `, {
        responseType: 'arraybuffer'
      }))
        .data;
      let bg = (await axios.get(encodeURI(`https://i.imgur.com/8An0Afg.png`), {
        responseType: "arraybuffer",
      }))
        .data;
      let kavt = (await axios.get(encodeURI(`https://i.imgur.com/UdAzsiF.png`), {
        responseType: "arraybuffer",
      }))
        .data;
      fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
      var avataruser = await circle(pathAvata);
      fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));
      fs.writeFileSync(pathkavt, Buffer.from(kavt, "utf-8"));
      if (!fs.existsSync( __dirname + `./cache/VT323-Regular.otf`)) {
        let getfont = (await axios.get(`https://github.com/tdunguwu/font/blob/main/VT323-Regular.ttf?raw=true`, {
          responseType: "arraybuffer"
        }))
          .data;
        fs.writeFileSync(__dirname + `/cache/chuky.otf`, Buffer.from(getfont, "utf-8"));
      };
      if (!fs.existsSync( __dirname + `./cache/chuky.otf`)) {
        let getfont = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/Asem-Kandis-PERSONAL-USE.ttf`, {
          responseType: "arraybuffer"
        }))
          .data;
        fs.writeFileSync(__dirname + `/cache/chuky.otf`, Buffer.from(getfont, "utf-8"));
      };
      if (!fs.existsSync(__dirname + `/cache/SVN-Transformer.otf`)) {
        let getfont1 = (await axios.get(`https://github.com/tdunguwu/font/blob/main/SVN-Transformer.ttf?raw=true`, {
          responseType: "arraybuffer"
        }))
          .data;
        fs.writeFileSync(__dirname + `/cache/SVN-Transformer.otf`, Buffer.from(getfont1, "utf-8"));
      };
      let baseImage = await loadImage(pathImg);
      let basekavt = await loadImage(pathkavt);
      let baseAvata = await loadImage(avataruser);
      let canvas = createCanvas(baseImage.width, baseImage.height);
      let canvas2 = createCanvas(basekavt.width, basekavt.height);
      let ctx = canvas.getContext("2d");
      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(baseAvata, 396, 389, 490, 487);
      ctx.drawImage(basekavt, 0, 0, canvas2.width, canvas2.height);
      Canvas.registerFont(__dirname + `/cache/VT323-Regular.otf`, {
        family: "VT323-Regular"
      });
      Canvas.registerFont(__dirname +`/cache/SVN-Transformer.otf`, {
        family: "SVN-Transformer"
      });
      Canvas.registerFont(__dirname + `/cache/chuky.otf`, {
        family: "chuky"
      });
      ctx.font = `${fontsInfo}px VT323-Regular`;
      ctx.fillStyle = "#ffff";
      ctx.textAlign = "start";
      ctx.fillText(`» ${gender}`, 457, 1205);
      ctx.fillText(`» ${location}`, 457, 1113);
      ctx.font = `${fontchuky}px chuky`;
      ctx.fillStyle = "#ffff";
      ctx.textAlign = "start";
      ctx.fillText(`${chuky}`, 1000, 1230);
      ctx.font = `${fontsLink}px VT323-Regular`;
      ctx.fillStyle = "#ffff";
      ctx.fillText(`» https://facebook.com/${vanity}`, 458, 1021);
      ctx.font = `${fontsname}px SVN-Transformer`;
      ctx.textAlign = "center";
      ctx.fillText(`${name}`, 634, 230);
      ctx.font = `${fontuid}px SVN-Transformer`;
      ctx.textAlign = "center";
      ctx.fillText(`UID: ${uid}`, 634, 350);
      ctx.beginPath();
      const imageBuffer = canvas.toBuffer();
      fs.writeFileSync(pathImg, imageBuffer);
      fs.writeFileSync(pathkavt, imageBuffer);
      fs.removeSync(pathAvata);
      res.set({ "Content-Type": "image/png" })
      res.send(canvas.toBuffer())
    }
}