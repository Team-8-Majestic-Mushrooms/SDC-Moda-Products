const { Pool } = require('pg');
const supertest = require('supertest');
const dbConfig = require('../config/db.config');
const server = require('../index');

describe('Server integration test', () => {
  let subscription;
  let pool;

  beforeEach(() => {
    subscription = server.listen(8082);
    pool = new Pool({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      database: dbConfig.DB,
      password: dbConfig.PASSWORD,
      port: dbConfig.PORT,
    });
  });

  afterEach(() => {
    pool.end();
    subscription.close();
  });

  it('GET /products should have correct route and response with correct data', (done) => {
    supertest(server)
      .get('/products')
      .expect(200)
      .then((response) => {
        const products = JSON.parse(response.text);
        expect(products.length).toBe(5);
        done();
      });
  });

  it('GET /products should handle pagination correctly', (done) => {
    supertest(server)
      .get('/products')
      .query({ page: 2, count: 2 })
      .expect(200)
      .then((response) => {
        const products = JSON.parse(response.text);
        expect(products.length).toBe(2);
        expect(products[0].id).toBe(3);
        done();
      });
  });

  it('GET /products/:product_id should have correct route and response with correct data', (done) => {
    const productID = '485620';
    supertest(server)
      .get(`/products/${productID}`)
      .then((response) => {
        const product = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(product.id).toBe(485620);
        done();
      });
  });
  it('GET /products/:product_id/styles should have correct route and response with correct data', (done) => {
    const productID = '34223';
    supertest(server)
      .get(`/products/${productID}/styles`)
      .then((response) => {
        const products = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(products.product_id).toBe('34223');
        expect(products.results).toHaveLength(2);
        done();
      });
  });

  it('GET /products/:product_id/related should have correct route and response with correct data', (done) => {
    const productID = '34223';
    supertest(server)
      .get(`/products/${productID}/related`)
      .then((response) => {
        const products = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(products).toHaveLength(5);
        done();
      });
  });
});
