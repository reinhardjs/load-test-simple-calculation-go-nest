export const bakOptions = {
    scenarios: {
        users: {
            executor: 'constant-arrival-rate',
            rate: 1, // 1 users
            timeUnit: '1.01s', // each 1.00001s second
            duration: '5s', // Total test duration
            preAllocatedVUs: 50000, // Allocate all VUs in advance
            exec: 'serial'
        }
    }
};

// for PID in $(pgrep -f "node"); do cpulimit -l <percentage> -p $PID; done