/* eslint-disable */
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '3s', target: 1 },
    { duration: '30s', target: 1 },
    { duration: '3s', target: 0 },
  ],
};

export default () => {
  const page = Math.floor(Math.random() * 10 + 100000);
  const count = 10;
  const res = http.get(http.url`http://localhost:8080/api/products?page=${page}&count=${count}`);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  sleep(1);
};
