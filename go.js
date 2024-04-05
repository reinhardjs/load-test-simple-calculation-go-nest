import http from 'k6/http';

// 103.172.204.152
const host = 'localhost'
const port = '8080'

export const options = {
    scenarios: {
        scenario1: {
            executor: 'constant-vus',
            vus: 100,
            duration: '10s', // Total test duration
            gracefulStop: '30s'
        },
    },
};

export default async function () {
    // Define your request headers with the JWT token
    const headers = {
        'Content-Type': 'application/json',
    };

    // Make an authenticated request
    const response = http.get(`http://${host}:${port}`, { headers: headers });
    console.log(`User ${__VU}: Request ${__ITER} - Status code: ${response.status}`);
}
