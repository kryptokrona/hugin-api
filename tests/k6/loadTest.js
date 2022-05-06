let http = require('k6/http') 
let sleep = require('k6')

module.exports.options = {
  duration: '1m',
  vus: 50,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
  },
}

export default function () {
  const res = http.get('http://localhost:3000')
  sleep(1)
}