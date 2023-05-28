const dbConfig = require("../config/db.config.js");
const supertest = require("supertest");
const { Pool } = require("pg");
const server = require("../index.js");
const { mockProducts, mockStyles, mockRelated } = require("./mockDBData.js");
const { product } = require("../controllers");

jest.mock("pg", () => {
  const mockPool = {
    query: undefined,
  };
  return { Pool: jest.fn(() => mockPool) };
});

// Server should be able to handle client's request and send query to database
describe("Server Unit test", () => {
  let pool;

  beforeEach(() => {
    pool = new Pool();
  });

  afterEach(() => {
    // jest.clearAllMocks();
  });

  it("GET /products should have correct route and response with correct data", (done) => {
    pool.query = () => Promise.resolve({ rows: mockProducts });
    supertest(server)
      .get("/products")
      .then((response) => {
        const products = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(products).toHaveLength(5);
        expect(products[0].id).toBe(485620);
        done();
      });
  });

  it("GET /products/:product_id should have correct route and response with correct data", (done) => {
    pool.query = () => Promise.resolve({ rows: [mockProducts[0]] });
    const product_id = "485620";
    supertest(server)
      .get(`/products/${product_id}`)
      .then((response) => {
        const product = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(product.id).toBe(485620);
        done();
      });
  });

  it("GET /products/:product_id/styles should have correct route and response with correct data", (done) => {
    pool.query = () => Promise.resolve({ rows: mockStyles });
    const product_id = "34223";
    supertest(server)
      .get(`/products/${product_id}/styles`)
      .then((response) => {
        const products = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(products.product_id).toBe("34223");
        expect(products.results).toHaveLength(2);
        done();
      });
  });

  it("GET /products/:product_id/related should have correct route and response with correct data", (done) => {
    pool.query = () =>
      Promise.resolve({ rows: [{ related_products: mockRelated }] });
    const product_id = "5";
    supertest(server)
      .get(`/products/${product_id}/related`)
      .then((response) => {
        const products = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(products).toHaveLength(4);
        done();
      });
  });
});
