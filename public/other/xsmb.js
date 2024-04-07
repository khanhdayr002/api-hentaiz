const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment-timezone');

exports.name = '/xsmb';
exports.index = async (req, res) => {
	let { date } = req.query;

	if (!date) {
		const currentHour = moment.tz("Asia/Ho_Chi_Minh").format("HH");
		const currentMinute = moment.tz("Asia/Ho_Chi_Minh").format("mm");
		if (currentHour > 18 || (currentHour == 18 && currentMinute >= 15))
			date = moment.tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY");
		else
			date = moment.tz("Asia/Ho_Chi_Minh").subtract(1, 'days').format("DD-MM-YYYY");
	}
	else
		date = date.replace(/\//g, '-');

	try {
		const response = await axios.get("https://xsmn247.me/xsmb-" + date + ".html");
		if (response.data.includes("Địa chỉ mà bạn vừa truy cập không tồn tại"))
			return res.status(404).json({ message: 'Not found result for this date' });
		const $ = cheerio.load(response.data);

		const maDB = $("table.extendable.kqmb.colgiai > tbody > tr > td.v-giai.madb > span.v-madb").text().trim().replace(/\s+/g, " ").split(" - ");
		if (maDB.length == 0)
			return res.status(404).json({ message: 'Not found result for this date' });
		const giaiDB = $('table.extendable.kqmb.colgiai > tbody > tr.db > td.v-giai.number > span.v-gdb').text().trim();
		const giaiNhat = $('table.extendable.kqmb.colgiai > tbody > tr > td.v-giai.number > span.v-g1').text().trim();
		const giaiNhi = [];
		$('#load_kq_mb_0 > div.one-city > table.extendable.kqmb.colgiai > tbody > tr:nth-child(4) > td.v-giai.number > span').each(function (index, element) {
			giaiNhi.push($(element).text().trim());
		});
		const giaiBa = [];
		$('#load_kq_mb_0 > div.one-city > table.extendable.kqmb.colgiai > tbody > tr:nth-child(5) > td.v-giai.number > span').each(function (index, element) {
			giaiBa.push($(element).text().trim());
		});
		const giaiTu = [];
		$('#load_kq_mb_0 > div.one-city > table.extendable.kqmb.colgiai > tbody > tr:nth-child(6) > td.v-giai.number > span').each(function (index, element) {
			giaiTu.push($(element).text().trim());
		});
		const giaiNam = [];
		$('#load_kq_mb_0 > div.one-city > table.extendable.kqmb.colgiai > tbody > tr:nth-child(7) > td.v-giai.number > span').each(function (index, element) {
			giaiNam.push($(element).text().trim());
		});
		const giaiSau = [];
		$('#load_kq_mb_0 > div.one-city > table.extendable.kqmb.colgiai > tbody > tr:nth-child(8) > td.v-giai.number > span').each(function (index, element) {
			giaiSau.push($(element).text().trim());
		});
		const giaiBay = [];
		$('#load_kq_mb_0 > div.one-city > table.extendable.kqmb.colgiai > tbody > tr:nth-child(9) > td.v-giai.number > span').each(function (index, element) {
			giaiBay.push($(element).text().trim());
		});

		return res.status(200).json({
			date: date,
			maDB,
			giaiDB: [giaiDB],
			giaiNhat: [giaiNhat],
			giaiNhi,
			giaiBa,
			giaiTu,
			giaiNam,
			giaiSau,
			giaiBay
		});
	}
	catch (err) {
		console.log(err);
		if (err.response.status == 404)
			return res.status(404).json({ message: 'Not found result for this date' });
		return res.status(500).json({ message: 'Internal server error' });
	}
};