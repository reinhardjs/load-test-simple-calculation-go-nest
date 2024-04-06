import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // Key configurations for Stress in this section
  stages: [
    { duration: '5s', target: 1000 },
    { duration: '5s', target: 1000 },
    { duration: '5s', target: 0 },
  ],
};

export default () => {
  const response = http.get('http://103.172.204.152:8080');
  console.log("body:", response.body, " status:", response.status)
  sleep(0);
  // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};
