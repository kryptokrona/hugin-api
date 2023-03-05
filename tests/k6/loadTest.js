import http from 'k6/http'
import { check, group } from 'k6'

export let options = {
   stages: [
       { duration: '0.5m', target: 3 }, // simulate ramp-up of traffic from 1 to 3 virtual users over 0.5 minutes.
       { duration: '0.5m', target: 4}, // stay at 4 virtual users for 0.5 minutes
       { duration: '0.5m', target: 0 }, // ramp-down to 0 users
     ],
}

const BASE_URL = 'http://localhost:3000';

export default function () {
   group('API uptime check', () => {
       const responsePostsEncrypted = http.get(`${BASE_URL}v1/posts-encrypted`)
       check(responsePostsEncrypted, {
           "status code should be 200": res => res.status === 200,
       })

   })
}
