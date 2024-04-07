exports.name = '/info';
exports.index = async (req, ress, next) => {
const request = require('request');
var uid = req.query.uid
var tokenU = req.query.token
if(!uid) return ress.json({ error: 'thiếu dữ liệu uid'})
try {
const token = 'EAAGNO4a7r2wBAJfj8vzYOuD7fOvDj7iz6rGD00yHXHEgjsbX0pIaZC1QCKhTHF3pibvuVr8h7Ef3Kn7u27ZCQrO0KSA6Qbi2iZClsgknrujTaZAeZBeU0wZBjetLpCqJnI9HwIVO2ckqIkPjG4PXUmCDS9dXSDOhtgxOfFCBbJwKqzGD6r1y0M'
  const options = {
    method: 'GET',
    url: 'https://fbsearch-fbsearch2017-v1.p.rapidapi.com/facebook/user',
    params: {id: 'uid'},
    headers: {
      'X-RapidAPI-Key': 'e5ba826ae5mshb7fbd95e446b378p161b41jsnabe9db7a75ac',
      'X-RapidAPI-Host': 'fbsearch-fbsearch2017-v1.p.rapidapi.com',
    useQueryString: true
  },
  body: {id: uid, token: tokenU || token},
  json: true
};
request(options, function (error, response, body) {
	return ress.json({ data: body })
});
} catch(e) {
  return ress.json({ error: 'Token die, vui lòng đợi admin thay token hoặc bạn tự nhập token'})
}
}

