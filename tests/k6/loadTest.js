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
  group('individualRequests', function () {
    http.get('http://localhost:3000/api/v1/posts')
    http.get('http://test-api.k6.io/public/crocodiles/2/')
    http.get('http://test-api.k6.io/public/crocodiles/3/')
  })

  group('batchRequests', function () {
    http.batch([
      ['GET', `http://test-api.k6.io/public/crocodiles/1/`],
      ['GET', `http://test-api.k6.io/public/crocodiles/2/`],
      ['GET', `http://test-api.k6.io/public/crocodiles/3/`],
    ])
  })

  const res = http.get('http://hugin-cache:3000/api/v1/posts')
  sleep(1)
}