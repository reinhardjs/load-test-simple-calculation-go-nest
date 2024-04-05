import http from 'k6/http';
import { group } from 'k6';

const host = 'localhost'

export const options = {
    scenarios: {
        users: {
            executor: 'constant-vus',
            duration: '1s', // Total test duration
            exec: 'paralel'
        }
    }
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
            const response = http.get(`http://${host}:4200`, { headers: headers });
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
            url: `http://${host}:4200`,
            headers: headers,
        });
    }

    // Send parallel requests using batch
    const responses = http.batch(requests);

    // Print the responses
    responses.forEach((res, index) => {
        console.log(`Response ${index}: Status code: ${res.status}`);
    });
}
