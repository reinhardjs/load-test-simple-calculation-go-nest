import http from 'k6/http';

// 103.172.204.152
const host = '103.172.204.152'
const port = '8080'

export const options = {
    scenarios: {
        // rampingScenario: {
        //     executor: 'ramping-arrival-rate',
        //     startRate: 500,
        //     preAllocatedVUs: 1000,
        //     stages: [
        //         { duration: '2s', target: 500 },
        //         { duration: '3s', target: 1000 },
        //         { duration: '5s', target: 1000 },
        //     ],
        //     exec: 'serial',
        // },
        constantScenario: {
            vus: 1000,
            executor: 'constant-vus',
            duration: '1s', // Total test duration
            gracefulStop: '60s',
            exec: 'serial',
        },
    },
};

export function serial() {
    // Define your request headers with the JWT token
    const headers = {
        'Content-Type': 'application/json',
    };

    // Make an authenticated request
    const response = http.get(`http://${host}:${port}`, { headers: headers });
    console.log(`User ${__VU}: Request ${__ITER} - Status code: ${response.status}`);
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
            url: `http://${host}:8080`,
            headers: headers,
        });
    }

    // Send parallel requests using batch
    const responses = http.batch(requests);

    // Print the responses
    responses.forEach((res, index) => {
        console.log(`Response ${index + 1}: Status code: ${res.status}`);
    });
}
