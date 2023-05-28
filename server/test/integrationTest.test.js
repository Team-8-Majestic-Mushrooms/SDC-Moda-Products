const { Pool } = require('pg');
const supertest = require('supertest');
const dbConfig = require('../config/db.config');
const server = require('../index');

describe('Server integration test', () => {
  let pool;

  beforeAll(() => {
    pool = new Pool({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      database: dbConfig.DB,
      password: dbConfig.PASSWORD,
      port: dbConfig.PORT,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /products', async () => {
    supertest(server)
      .get('/products')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBe(5);
      });
  });
});

// it('GET /products/:product_id should have correct route and response with correct data', (done) => {
//   pool.query = () => Promise.resolve({ rows: [mockProducts[0]] });
//   const product_id = '485620';
//   supertest(server)
//     .get(`/products/${product_id}`)
//     .then((response) => {
//       const product = JSON.parse(response.text);
//       expect(response.status).toBe(200);
//       expect(product.id).toBe(485620);
//       done();
//     });
// });

// it('GET /products/:product_id/styles should have correct route and response with correct data', (done) => {
//   pool.query = () => Promise.resolve({ rows: mockStyles });
//   const product_id = '34223';
//   supertest(server)
//     .get(`/products/${product_id}/styles`)
//     .then((response) => {
//       const products = JSON.parse(response.text);
//       expect(response.status).toBe(200);
//       expect(products.product_id).toBe('34223');
//       expect(products.results).toHaveLength(2);
//       done();
//     });
// });

// it('GET /products/:product_id/related should have correct route and response with correct data', (done) => {
//   pool.query = () => Promise.resolve({ rows: [{ related_products: mockRelated }] });
//   const product_id = '5';
//   supertest(server)
//     .get(`/products/${product_id}/related`)
//     .then((response) => {
//       const products = JSON.parse(response.text);
//       expect(response.status).toBe(200);
//       expect(products).toHaveLength(4);
//       done();
//     });
// });
