const axios = require("axios");
const cookies = require('./cookies.json');
/*
const username = "ntkhang999@gmail.com";
const password = "anhyeuemnhieulam";
let cookie;
const wating = getCookie(username, password)
	.then(res => {
		cookie = res;
	});
*/

const headers = {
  "accept": "*/*",
  "accept-language": "vi,en-US;q=0.9,en;q=0.8",
  "sec-ch-ua": "\"Chromium\";v=\"106\", \"Microsoft Edge\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "x-asbd-id": "198387",
  "x-csrftoken": "tJk2tDhaeYfUeJRImgbH75Vp6CV6PjtW",
  "x-ig-app-id": "936619743392459",
  "x-ig-www-claim": "hmac.AR1NFmgjJtkM68KRAAwpbEV2G73bqDP45PvNfY8stbZcFiRA",
  "x-instagram-ajax": "1006400422",
  "Referer": "https://www.instagram.com/",
  "Referrer-Policy": "strict-origin-when-cross-origin"
};

exports.name = '/instagram/dlpost';
exports.index = async (req, res, next) => {
  const {
    url
  } = req.query;
  if (!url)
    return res.json({
    error: "Missing url"
  });
  if (!url.match(/https:\/\/www\.instagram\.com\/(p|reel)\/[a-zA-Z0-9]+/))
    return res.json({
    error: "Invalid url"
  });

  try {
    const data = await getPost(url);
    return res.json(data);
  }
  catch (e) {
    // console.log(e);
    return res.json({
      error: "Server error",
      message: "Something went wrong, please try again later"
    });
  }
};


async function getPost(url) {
  const cookie = cookies[Math.floor(Math.random() * cookies.length)];
  headers.cookie = cookie;
  
  const res__ = await axios({
      url,
      headers,
      method: "GET"
    });
  const { data } = res__;
  // console.log(res__)
  const postId = data.match(/instagram:\/\/media\?id=(\d+)/)?.[1];
  if (!postId)
    throw new Error("Not found");

  
  const res = await axios({
    url: `https://www.instagram.com/api/v1/media/${postId}/info/`,
    headers,
    method: "GET"
  });
  delete headers.cookie;

  const info = res.data.items?.[0] || {};
  const dataReturn = {
    images: [],
    videos: []
  };

  if (info.video_versions)
    dataReturn.videos = [info.video_versions[info.video_versions.length - 1].url];
  else {
    const allImage = info.carousel_media || [{
      image_versions2: res.data.image_versions2 || info.image_versions2
    }];

    dataReturn.images = allImage.map(item => {
      // console.log(item);
      return item.image_versions2.candidates[0].url;
    });
  }
  return {
    ...dataReturn,
    caption: info.caption?.text || "",
    owner: {
      id: info.user.pk,
      username: info.user.username,
      full_name: info.user.full_name,
      profile_pic_url: info.user.profile_pic_url
    },
    like_count: info.like_count,
    comment_count: info.comment_count,
    created_at: info.taken_at,
    media_type: info.media_type,
    originalData: info
  };
}

// async function checkLive(cookie) {
// 	if (!cookie)
// 		return false;
// 	const res = await axios.get("https://www.instagram.com/accounts/edit/", {
// 		headers: {
// 			cookie
// 		}
// 	});
// 	return !res.request.res.responseUrl.includes("accounts/login");
// }

// async function getCookie(username, password) {
// 	const res = await axios({
// 		url: 'https://goatbotserver.onrender.com/api/get-cookie-instagram',
// 		method: 'GET',
// 		params: {
// 			username,
// 			password,
// 			apikey: "acvyu28fasg"
// 		}
// 	});
// 	return res.data.cookie;
// }