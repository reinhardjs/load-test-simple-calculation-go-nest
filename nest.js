import http from 'k6/http';
import { group } from 'k6';

// 103.172.204.152
const host = 'localhost'
const port = '4200'

export const options = {
    scenarios: {
        scenario1: {
            executor: 'constant-vus',
            vus: 1,
            duration: '1s', // Total test duration
            gracefulStop: '10s',
            exec: 'paralel'
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

export function paralel() {
    // Define your request headers with the JWT token
    const headers = {
        'Content-Type': 'application/json',
    };

    // Define an array to hold the requests
    let requests = [];

    // Define the number of parallel requests
    const numRequests = 1000;

    // Populate the requests array with the requests
    for (let i = 0; i < numRequests; i++) {
        requests.push({
            method: 'GET',
            url: `http://${host}:${port}`,
            headers: headers,
        });
    }

    // Send parallel requests using batch
    const responses = http.batch(requests);

    // Print the responses
    responses.forEach((res, index) => {
        console.log(`Response ${index+1}: Status code: ${res.status}`);
    });
}
