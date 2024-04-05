import http from 'k6/http';
import { group } from 'k6';

// 103.172.204.152
const host = 'localhost'
const port = '8080'

export const options = {
    scenarios: {
        scenario1: {
            executor: 'constant-vus',
            vus: 1000,
            duration: '10s', // Total test duration
            gracefulStop: '30s',
            exec: 'serial'
        },
    },
};

export function serial() {
    // each user have 1 requests
    for (let i = 0; i < 1; i++) {
        group('API Requests', function () {
            // Define your request headers with the JWT token
            const headers = {
                'Content-Type': 'application/json',
            };

            // Make an authenticated request
            const response = http.get(`http://${host}:${port}`, { headers: headers });
            console.log(`User ${__VU}: Request ${__ITER + 1} - Status code: ${response.status}`);
        });
    }
}
