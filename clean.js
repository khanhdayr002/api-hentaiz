const fs = require("fs");

const files = fs.readdirSync('./public/up_dowload/cache');
files.forEach(file => {
    const filePath = `./public/up_dowload/cache/${file}`;
    if (fs.statSync(filePath).isFile() && file != "README.txt") {
        fs.unlinkSync(filePath);
    }
});
