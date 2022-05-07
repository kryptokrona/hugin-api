import http from 'k6/http'
import { check, group, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
}

const BASE_URL = 'http://localhost:3000';

export default () => {
  const allPosts = http.get(`${BASE_URL}/api/v1/posts`).json()
  check(allPosts, { 'retrieved posts': (obj) => obj.length > 0 })

  const allHashtags = http.get(`${BASE_URL}/api/v1/hashtags`).json()
  check(allHashtags, { 'retrieved hashtags': (obj) => obj.length > 0 })

  sleep(1)
}