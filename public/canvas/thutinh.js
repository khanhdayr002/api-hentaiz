
const fs = require("fs-extra")
const { loadImage, createCanvas, registerFont, Canvas } = require("canvas");

module.exports.wrapText = (ctx, text, maxWidth) => {
  return new Promise((resolve) => {
    if (ctx.measureText(text).width < maxWidth) return resolve([text]);
    if (ctx.measureText("W").width > maxWidth) return resolve(null);
    const words = text.split(" ");
    const lines = [];
    let line = "";
    while (words.length > 0) {
      let split = false;
      while (ctx.measureText(words[0]).width >= maxWidth) {
        const temp = words[0];
        words[0] = temp.slice(0, -1);
        if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
        else {
          split = true;
          words.splice(1, 0, temp.slice(-1));
        }
      }
      if (ctx.measureText(`${line}${words[0]}`).width < maxWidth)
        line += `${words.shift()} `;
      else {
        lines.push(line.trim());
        line = "";
      }
      if (words.length === 0) lines.push(line.trim());
    }
    return resolve(lines);
  });
};
exports.name = '/thutinh2';
exports.index = async  (req, res, next) => { var
  to     = req.query.to,  
  text   = req.query.text,
  name   = req.query.name;

///////////////////////////////////////////////////////////////////////////////////
	if(!to || !text || !name) return res.json({"messsage":"Thiếu dữ liệu"})
///////////////////////////////////////////////////////////////////////////////////
  let bg   = await loadImage(__dirname + '/cache/bg.jpg');

  ////////////////////////////Canvas///////////////////////////////////////////////
  registerFont(__dirname+"/cache/AmaticSCbold.ttf", {family: "AmaticSCbold"});
  
  var canvas = createCanvas(bg.width, bg.height);
  var ctx = canvas.getContext("2d");

  ctx.drawImage(bg, 0, 0);
  ctx.fillStyle = "#F06163";

  ctx.font = "40px AmaticSCbold";
  const line = await this.wrapText(ctx, text, 380);
  ctx.fillText(line.join("\n"), 60, 220)

  ctx.font = "50px AmaticSCbold";
  ctx.textAlign = "center";

  textMaxWidth(to, "50px AmaticSCbold", 570, 170, 50, canvas, ctx);
  function textMaxWidth(text, font, top,maxw,maxf,can,ctx) {
  do { maxf--;
  ctx.font = maxf + "px " + font
  } while (ctx.measureText(to).width > maxw);
  ctx.fillText("- " + to + " -", 250, top)
  }    
  
  ctx.font = "50px AmaticSCbold";
  ctx.textAlign = "left";
  ctx.fillText(name, 150, 447);

	const Export = canvas.toBuffer();
       res.type('image/jpeg')                                         
  res.write(Export)
  res.end();
}