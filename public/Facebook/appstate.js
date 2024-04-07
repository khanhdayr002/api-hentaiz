exports.name = '/facebook/appstate';
const deviceID = require('uuid')
const adid = require('uuid')
const totp = require("totp-generator")
const axios = require("axios")
exports.index = async (req, res, next) => {
    var { username, password, twofactor = '0' , _2fa } = req.query;
    if (!username || !password) return res.json({
        status: false,
        message: 'Vui lòng nhập đủ thông tin!'
    });
    try {
        var form = {
            adid: adid.v4(),
            email: username,
            password: password,
            format: 'json',
            device_id: deviceID.v4(),
            cpl: 'true',
            family_device_id: deviceID.v4(),
            locale: 'en_US',
            client_country_code: 'US',
            credentials_type: 'device_based_login_password',
            generate_session_cookies: '1',
            generate_analytics_claim: '1',
            generate_machine_id: '1',
            currently_logged_in_userid: '0',
            irisSeqID: 1,
            try_num: "1",
            enroll_misauth: "false",
            meta_inf_fbmeta: "NO_FILE",
            source: 'login',
            machine_id: randomString(24),
            meta_inf_fbmeta: '',
            fb_api_req_friendly_name: 'authenticate',
            fb_api_caller_class: 'com.facebook.account.login.protocol.Fb4aAuthHandler',
            api_key: '882a8490361da98702bf97a021ddc14d',
            access_token: '350685531728%7C62f8ce9f74b12f84c123cc23437a4a32'
        }
        form.sig = encodesig(sort(form))
        var options = {
            url: 'https://b-graph.facebook.com/auth/login',
            method: 'post',
            data: form,
            transformRequest: [
                (data, headers) => {
                    return require('querystring').stringify(data)
                },
            ],
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                "x-fb-friendly-name": form["fb_api_req_friendly_name"],
                'x-fb-http-engine': 'Liger',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
              cookie: "sb=eKKAY7ArB12wNgYT_RODy7oB; datr=eaKAYzrxFe5qTVrlnmpBVn7Q; c_user=100000225673860; m_page_voice=100000225673860; wd=1920x963; xs=12%3A7KRB9gGQwaHt5g%3A2%3A1689598822%3A-1%3A6290%3A%3AAcW5-pEJJ7GoVdfiYQoo0A4VUNvOjtOqfk9iIzBoiMwB; fr=0iOsfQ339brjlxFQJ.AWXD5lYuTSLZsasLjjiskaLUDi8.Bk8hHq.Pj.AAA.0.0.Bk8hHq.AWX8yFB8Gvk; presence=C%7B%22lm3%22%3A%22u.100079086835283%22%2C%22t3%22%3A%5B%7B%22o%22%3A0%2C%22i%22%3A%22u.100039986310453%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100065586904588%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100074100303075%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100038780015811%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.7444167328943151%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100082668132301%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.1207110219342973%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100001761237574%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100087438951039%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100005201702431%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100014958216759%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.8321062807935493%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100037741424837%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.5988765337888667%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100077497896569%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100071768980176%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100063855025744%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100046691234633%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.6947890241890495%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.4316745955077359%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.9891986724174760%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.4853893041400316%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100044832440420%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100029340348630%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.5668747433145242%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.1664397623%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.6924951360869970%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100011663281378%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100075493308135%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.24136113082654624%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.6426651960726120%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100092674113587%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.7215618755120081%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.5361215824007861%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.6844521818997745%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100000692804831%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100054391143845%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100033992950950%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100028356152567%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100003255692360%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100064535052970%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100030967444445%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.6362141067212155%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100063456296135%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100090035004488%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100089352882349%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100076344452639%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.6351983704849926%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.1496041630%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100030050717942%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100005845206394%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100074802690241%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100081316312557%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100073926923961%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100040945304427%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100025576475462%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22u.100040714093705%22%7D%2C%7B%22o%22%3A0%2C%22i%22%3A%22g.8050020041690648%22%7D%5D%2C%22utc3%22%3A1693586670019%2C%22v%22%3A1%7D"
            }
        }
        return new Promise((resolve) => {
            axios.request(options).then(async(response) => {
                try {
                    response.data.cookies = await convertCookie(response.data.session_cookies)
                    response.data.session_cookies = response.data.session_cookies.map((e) => {
                        return {
                            key: e.name,
                            value: e.value,
                            domain: "facebook.com",
                            path: e.path,
                            hostOnly: e.hostOnly,
                creation: new Date().toISOString(),
                lastAccessed: new Date().toISOString()
                        }
                    })
                    return res.json( response.data.session_cookies);
                }
                catch(e) {
                    return res.json({
                        status: false,
                        message: "Vui lòng bật xác thực 2FA rồi thử lại!"
                    });
                }
            }).catch((error) => {
                if(error.response.data.error.code == 401) {
                    return res.json({
                        status: false,
                        message: error.response.data.error.message
                    });
                }
                if(twofactor == '0' && (!_2fa || _2fa == "0")) {
                    return res.json({
                        status: false,
                        message: 'Vui lòng nhập mã xác thực 2 lớp!'
                    });
                }
                var data = error.response.data.error.error_data;
                try {
                    _2fa = (_2fa != "0") ? _2fa : totp(decodeURI(twofactor).replace(/\s+/g, '').toLowerCase())
                }
                
                catch (e) {
                    return res.json({
                        status: false,
                        message: 'Mã xác thực 2 lớp không hợp lệ!'
                    });
                }
                form.twofactor_code = _2fa,
                form.encrypted_msisdn = ""
                form.userid = data.uid
                form.machine_id = data.machine_id
                form.first_factor = data.login_first_factor
                form.credentials_type = "two_factor"
                form.sig = encodesig(sort(form))
                options.data = form
                axios.request(options).then(async(response) => {
                    response.data.cookies = await convertCookie(response.data.session_cookies)
                    response.data.session_cookies = response.data.session_cookies.map((e) => {
                        return {
                            key: e.name,
                            value: e.value,
                            domain: "facebook.com",
                            path: e.path,
                            hostOnly: e.hostOnly,
                creation: new Date().toISOString(),
                lastAccessed: new Date().toISOString()
                        }
                    })
                    return res.json(
                      response.data.session_cookies
                    );
                }).catch((error) => {
                    return res.json({
                        status: false,
                        message: error.response.data
                    });
                })
            })
        })
    } catch (e) {
        return res.json({
            status: false,
            message: 'Sai mật khẩu hoặc tài khoản vui lòng kiểm tra lại mật khẩu hoặc tài khoản!'
        });
    }

}
async function convertCookie(seasion) {
    var cookie = "";
    for (var i = 0; i < seasion.length; i++) {
        cookie += seasion[i].name + "=" + seasion[i].value + "; ";
    }
    return cookie;
}
function randomString(length) {
    length = length || 10
    var char = 'abcdefghijklmnopqrstuvwxyz'
    char = char.charAt(
        Math.floor(Math.random() * char.length)
    )
    for (var i = 0; i < length - 1; i++) {
        char += 'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(
            Math.floor(36 * Math.random())
        )
    }
    return char
}
function encodesig(string) {
    var data = ''
    Object.keys(string).forEach(function (info) {
        data += info + '=' + string[info]
    })
    data = md5(data + '62f8ce9f74b12f84c123cc23437a4a32')
    return data
}

function md5(string) {
    return require('crypto').createHash('md5').update(string).digest('hex')
}

function sort(string) {
    var sor = Object.keys(string).sort(),
        data = {},
        i
    for (i in sor)
        data[sor[i]] = string[sor[i]]
    return data
}