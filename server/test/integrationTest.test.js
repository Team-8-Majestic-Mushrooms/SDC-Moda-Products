const dbConfig = require("../config/db.config.js");
const supertest = require("supertest");
const { Pool } = require("pg");
const server = require("../index.js");
const { mockProducts } = require("./mockDBData.js");
const { product } = require("../controllers");

jest.mock("pg", () => {
  const mockPool = {
    query: undefined,
  };
  return { Pool: jest.fn(() => mockPool) };
});

// beforeEach(() => {
//   const pool = new Pool({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     database: dbConfig.DB,
//     password: dbConfig.PASSWORD,
//     port: dbConfig.PORT,
//   });
// });

// afterAll(pool.end);
// Server should be able to handle client's request and send query to database
describe("Server Unit test", () => {
  let pool;

  beforeEach(() => {
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET /products", (done) => {
    pool.query = () => Promise.resolve({ rows: mockProducts });
    supertest(server)
      .get("/products")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text)).toHaveLength(5);
        done();
      });
  });

  it.only("GET /products should be able to handle pagination", (done) => {
    pool.query = () => Promise.resolve({ rows: mockProducts });
    const page = 2;
    const count = 2;
    supertest(server)
      .get("/products")
      .query({ page: page, count: count })
      .then((response) => {
        const products = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(products).toHaveLength(2);
        expect(products[0].id).toBe(485646);
        expect(products[1].id).toBe(485663);
        done();
      });
  });
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
