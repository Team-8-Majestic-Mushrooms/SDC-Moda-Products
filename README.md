# SDC-MODA Product API
## Description

In this project, I designed and implemented the backend of an e-commerce platform and improved its performance to handle high-volume traffic (to 10000 queries per second).

## Technologies Used

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5.svg?style=for-the-badge&logo=Kubernetes&logoColor=white)](https://kubernetes.io/)
[![Amazon AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)
[![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)](https://jestjs.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![K6](https://img.shields.io/badge/k6-7D64FF.svg?style=for-the-badge&logo=k6&logoColor=white)](https://k6.io/)
[![New Relic](https://img.shields.io/badge/New%20Relic-008C99.svg?style=for-the-badge&logo=New-Relic&logoColor=white)](https://newrelic.com/)
[![Trello](https://img.shields.io/badge/Trello-0052CC.svg?style=for-the-badge&logo=Trello&logoColor=white)](https://trello.com/)

## Wins and Improvements

<a href="https://ibb.co/M2RYx6x"><img src="https://i.ibb.co/RvCxkyk/Screen-Shot-2023-06-21-at-10-19-54.png" alt="Screen-Shot-2023-06-21-at-10-19-54" border="0"></a>

- Performed ETL with Java to seed the database with 25 million records in 40 min.
- Optimized local average query time to <30 ms through indexing and token-based pagination
- Containerized the server and database with Docker and deployed them on AWS EC2.
- Conducted load tests with Loader.io and New Relic to identify performance bottlenecks.
- Scaled out the backend with an HAProxy load balancer and six servers, achieving a throughput increase from 1000 to 10000 QPS with 70 ms average latency and 0.3% error rate.
