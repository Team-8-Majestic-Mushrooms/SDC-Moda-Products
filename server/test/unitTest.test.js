const supertest = require('supertest');
const { Pool } = require('pg');
const server = require('../index');
const { mockProducts, mockStyles, mockRelated } = require('./mockDBData');

jest.mock('pg', () => {
  const mockPool = {
    query: undefined,
  };
  return { Pool: jest.fn(() => mockPool) };
});

// Server should be able to handle client's request and send query to database
describe('Server Unit test', () => {
  let pool;

  beforeEach(() => {
    pool = new Pool();
  });

  afterEach(() => {
    // jest.clearAllMocks();
  });

  it('GET /api/products should have correct route and response with correct data', (done) => {
    pool.query = () => Promise.resolve({ rows: mockProducts });
    supertest(server)
      .get('/api/products')
      .then((response) => {
        const products = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(products).toHaveLength(5);
        expect(products[0].id).toBe(485620);
        done();
      });
  });

  it('GET /api/products/:product_id should have correct route and response with correct data', (done) => {
    pool.query = () => Promise.resolve({ rows: [mockProducts[0]] });
    const productID = '485620';
    supertest(server)
      .get(`/api/products/${productID}`)
      .then((response) => {
        const product = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(product.id).toBe(485620);
        done();
      });
  });

  it('GET /api/products/:product_id/styles should have correct route and response with correct data', (done) => {
    pool.query = () => Promise.resolve({ rows: mockStyles });
    const productID = '34223';
    supertest(server)
      .get(`/api/products/${productID}/styles`)
      .then((response) => {
        const products = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(products.product_id).toBe('34223');
        expect(products.results).toHaveLength(2);
        done();
      });
  });

  it('GET /api/products/:product_id/related should have correct route and response with correct data', (done) => {
    pool.query = () => Promise.resolve({ rows: [{ related_products: mockRelated }] });
    const productID = '5';
    supertest(server)
      .get(`/api/products/${productID}/related`)
      .then((response) => {
        const products = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(products).toHaveLength(4);
        done();
      });
  });
});
