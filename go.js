import http from 'k6/http';

// 103.172.204.152
const host = 'localhost'
const port = '8080'

export const options = {
    scenarios: {
        scenario1: {
            executor: 'constant-vus',
            vus: 1,
            duration: '5s', // Total test duration
            gracefulStop: '30s',
            exec: 'serial',
        },
    },
};

export function serial () {
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
    const numRequests = 10;

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
        console.log(`Response ${index+1}: Status code: ${res.status}`);
    });
}
