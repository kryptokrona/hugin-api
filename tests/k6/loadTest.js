let http = require('k6/http') 
let sleep = require('k6')

module.exports.options = {
  thresholds: {
    'group_duration{group:::individualRequests}': ['avg < 400'],
    'group_duration{group:::batchRequests}': ['avg < 200'],
  },
  vus: 1,
  duration: '10s',
}

export default function () {
  group('individualRequests', function () {
    // POSTS
    http.get('http://localhost:3000/api/v1/posts')
    http.get('http://localhost:3000/api/v1/posts/latest?size=10&page=0')
    http.get('http://localhost:3000/api/v1/posts/latest')
    http.get('http://localhost:3000/api/v1/posts/08d9a3158ff7111e8a1a8f0c6012039dff1b34fbbdfe3e9a8e5e399452fdba16')

    // HASHTAGS
    http.get('http://localhost:3000/api/v1/hashtags/latest')
    http.get('http://localhost:3000/api/v1/hashtags')
    http.get('http://localhost:3000/api/v1/hashtags/1')
    http.get('http://localhost:3000/api/v1/hashtags/trending')
    http.get('http://localhost:3000/api/v1/hashtags?search=krona')
  })

  group('batchRequests', function () {
    // POSTS
    http.batch([
      ['GET', `http://localhost:3000/api/v1/posts`],
      ['GET', `http://localhost:3000/api/v1/posts/latest?size=10&page=0`],
      ['GET', `http://localhost:3000/api/v1/posts/latest`],
      ['GET', `http://localhost:3000/api/v1/posts/08d9a3158ff7111e8a1a8f0c6012039dff1b34fbbdfe3e9a8e5e399452fdba16`],
    ])

    // HASHTAGS
    http.batch([
      ['GET', `http://localhost:3000/api/v1/hashtags/latest`],
      ['GET', `http://localhost:3000/api/v1/hashtags`],
      ['GET', `http://localhost:3000/api/v1/hashtags/1`],
      ['GET', `http://localhost:3000/api/v1/hashtags/trending`],
      ['GET', `http://localhost:3000/api/v1/hashtags?search=krona`],
    ])
  })

  sleep(1)
}