const axios = require("axios");
const cheerio = require("cheerio")
exports.name = '/hentai/:type';
exports.index = async(req, resp, next) => {
  		try {
			var { type } = req.params;
			var { query, link } = req.query;
			var hentai = new Hentai();
			if (!type) return resp.json({ error: true, message: "Missing type" });
			switch (type) {
				case "home": {
					var data = await hentai.home();
					return resp.json({ error: false, data });
				}
				case "search": {
					if (!query) return resp.json({ error: true, message: "Missing query" });
					var data = await hentai.search(query);
					return resp.json({ error: false, data });
				}
				case "details": {
					if (!link || !hentai.vaildURL(link)) return resp.json({ error: true, message: "Missing link" });
					var data = await hentai.details(link);
					return resp.json({ error: false, data });
				}
				case "read": {
					if (!link || !hentai.vaildURL(link)) return resp.json({ error: true, message: "Missing link" });
					var data = await hentai.read(link);
					return resp.json({ error: false, data });
				}
				default: {
					return resp.json({ error: true, message: "Invalid type" });
				}
			}
		} catch (e) {
			return resp.json({
				status: 400,
				message: "Bad request"
			});
		}
}
class Hentai {
	constructor() {
		this.url = 'https://mangahentai.me/'
	}
	DOM(url, method = 'get') {
		return new Promise(async (resolve, reject) => {
			axios({
				method,
				url
			}).then(res => {
				const $ = cheerio.load(res.data)
				resolve($)
			}).catch(err => reject(err))
		})
	}
	async home() {
		const $ = await this.DOM(this.url)
		var data = []
		$('.page-listing-item > div > div').each(function (a, b) {
			data.push({
				title: $(b).find('h3 > a').text(),
				thumb: $(b).find('a > img').attr('src'),
				link: $(b).find('h3 > a').attr('href'),
				chapter: $(b).find('.chapter').text().trim().split('\n')[0].trim()
			})
		})
		return data
	}
	async search(query) {
		const $ = await this.DOM(this.url + '?s=' + query + '&post_type=wp-manga')
		var data = []
		$('.search-wrap > div:eq(1) > div > div').each(function (a, b) {
			data.push({
				title: $(b).find('h3 > a').text(),
				thumb: $(b).find('a > img').attr('src'),
				link: $(b).find('h3 > a').attr('href')
			})
		})
		data.pop()
		return data
	}
	async details(link) {
		if (!this.vaildURL(link)) return { error: true, message: "Link không hợp lệ" }
		const $ = await this.DOM(link + 'ajax/chapters/', 'post')
		var data = []
		$('.wp-manga-chapter').each(function (a, b) {
			data.push({
				title: $(b).find('a').text(),
				link: $(b).find('a').attr('href')
			})
		})
		return data
	}
	async read(link) {
		if (!this.vaildURL(link)) return { error: true, message: "Link không hợp lệ" }
		const $ = await this.DOM(link)
		var data = []
		$('.page-break.no-gaps > img').each(function (a, b) {
			data.push($(b).attr('src').trim())
		})
		return data
	}
	vaildURL(str) {
		const regex = /^(ftp|http|https):\/\/[^ "]+$/;
		return regex.test(str);
	}
}