/* eslint-disable */
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '10s', target: 0 },
  ],
};

export default () => {
  const productID = Math.floor(Math.random() * 1000000);
  const res = http.get(http.url`http://localhost:8080/api/products/${productID}/styles`);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  sleep(1);
};
