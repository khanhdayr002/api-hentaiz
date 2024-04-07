const axios = require("axios");
const cheerio = require("cheerio");
const proxyHost = "111.225.152.37";
const proxyPort = "8089";
const axiosInstance = axios.create({
	proxy: {
		host: proxyHost,
		port: proxyPort,
	},
});


async function getVideoFb(url) {
	const res = await axiosInstance({
		method: 'POST',
		url: 'https://snapsave.app/action.php?lang=vn',
		headers: {
			"content-type": "multipart/form-data"
		},
		data: {
			url
		}
	});

	let html;
	const evalCode = res.data.replace('return decodeURIComponent', 'html = decodeURIComponent');
	eval(evalCode);
	html = html.split('innerHTML = "')[1].split('";\n')[0].replace(/\\"/g, '"');
	const $ = cheerio.load(html);
	const download = [];
	$('table').find('tbody').find('tr').each(function (i, elem) {
		const trElement = $(elem);
		const tds = trElement.children();
		const quality = $(tds[0]).text().trim();
		const url = $(tds[2]).children("a").attr("href");
		if (url != undefined) {
			download.push({
				quality,
        
				url
			});
		}
	});

	/*
		[
			{
				quality: '720p (HD)',
				url: 'https://video-ord5-2.xx.fbcdn.net/v/t39.25447-2/xxxxxx'
			},
			{
				quality: '360p (SD)',
				url: 'https://video-ord5-2.xx.fbcdn.net/v/t42.1790-2/xxxxx'
			}
		]
	*/
	return download;
}


exports.name = '/fbdownload';
exports.index = async (req, res, next) => {
	function isUrlValid(link) {
		const res = link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
		if (res == null)
			return !1;
		else
			return !0;
	}
	const link = req.query.url;
	if (!link) return res.jsonp({ error: "Vui lòng nhập URL video Facebook cần tải" });
	if (!isUrlValid(link)) return res.jsonp({ error: "Vui lòng nhập URL hợp lệ" });
	try {
		const data = await getVideoFb(link);
		if (data.length == 0)
			return res.jsonp({ error: "Không tìm thấy link donwload video" });
		return res.jsonp({ data });
	}
	catch (e) {
		return res.jsonp({
			error: 'Không thể xử lí yêu cầu của bạn'
		});
	}
};