const { Pool } = require('pg');
const supertest = require('supertest');
const dbConfig = require('../config/db.config');
const server = require('../index');

beforeEach(() => {
  const pool = new Pool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    database: dbConfig.DB,
    password: dbConfig.PASSWORD,
    port: dbConfig.PORT,
  });
});

// afterAll(pool.end);
// Server should be able to handle client's request and send query to database
describe('Server Unit test', () => {
  let pool;

  beforeEach(() => {
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // it("GET /products", (done) => {
  //   pool.query = () => Promise.resolve({ rows: mockProducts });
  //   supertest(server)
  //     .get("/products")
  //     .then((response) => {
  //       expect(response.status).toBe(200);
  //       expect(JSON.parse(response.text)).toHaveLength(5);
  //       done();
  //     });
  // });

  // it("GET /products should be able to handle pagination", (done) => {
  //   pool.query = () => Promise.resolve({ rows: mockProducts });
  //   const page = 2;
  //   const count = 2;
  //   supertest(server)
  //     .get("/products")
  //     .query({ page: page, count: count })
  //     .then((response) => {
  //       const products = JSON.parse(response.text);
  //       expect(response.status).toBe(200);
  //       expect(products).toHaveLength(2);
  //       expect(products[0].id).toBe(485646);
  //       expect(products[1].id).toBe(485663);
  //       done();
  //     });
  // });
});

// it("GET /products", async () => {
//   supertest(server)
//     .get("/products")
//     .expect(200)
//     .then((response) => {
//       expect(Array.isArray(response.body)).toBeTruthy();
//       expect(response.body.length).toBe(5);
//     });
//   done();
// });
it('GET /products should have correct route and response with correct data', (done) => {
  pool.query = () => Promise.resolve({ rows: mockProducts });
  supertest(server)
    .get('/products')
    .then((response) => {
      const products = JSON.parse(response.text);
      expect(response.status).toBe(200);
      expect(products).toHaveLength(5);
      expect(products[0].id).toBe(485620);
      done();
    });
});

it('GET /products/:product_id should have correct route and response with correct data', (done) => {
  pool.query = () => Promise.resolve({ rows: [mockProducts[0]] });
  const product_id = '485620';
  supertest(server)
    .get(`/products/${product_id}`)
    .then((response) => {
      const product = JSON.parse(response.text);
      expect(response.status).toBe(200);
      expect(product.id).toBe(485620);
      done();
    });
});

it('GET /products/:product_id/styles should have correct route and response with correct data', (done) => {
  pool.query = () => Promise.resolve({ rows: mockStyles });
  const product_id = '34223';
  supertest(server)
    .get(`/products/${product_id}/styles`)
    .then((response) => {
      const products = JSON.parse(response.text);
      expect(response.status).toBe(200);
      expect(products.product_id).toBe('34223');
      expect(products.results).toHaveLength(2);
      done();
    });
});

it('GET /products/:product_id/related should have correct route and response with correct data', (done) => {
  pool.query = () => Promise.resolve({ rows: [{ related_products: mockRelated }] });
  const product_id = '5';
  supertest(server)
    .get(`/products/${product_id}/related`)
    .then((response) => {
      const products = JSON.parse(response.text);
      expect(response.status).toBe(200);
      expect(products).toHaveLength(4);
      done();
    });
});
