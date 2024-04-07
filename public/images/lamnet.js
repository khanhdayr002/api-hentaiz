const axios = require('axios');
const fs = require('fs');
exports.name = '/lamnet';

exports.index = async (req, res, next) => {
  try {
    // if (huydev(req, res)) return;
    const link = req.query.link;
    if (!link) return res.status(400).json({ error: 'Thiếu link.' });

    const response = await axios.get(`https://duongkum999.codes/upscale?url=${link}`, { responseType: 'arraybuffer' });

    const imageBuffer = Buffer.from(response.data, 'binary');

    res.writeHead(400, {
      'Content-Type': 'image/png',
      'Content-Length': imageBuffer.length
    });
    res.end(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(1000).json({ error: 'Sever nghẽn vui lòng thử lại sau.' });
  }
};