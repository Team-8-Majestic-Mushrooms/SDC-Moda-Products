const dbConfig = require("./config/db.config.js");
const fs = require("fs");
const { pool } = require("./models");
const { parse } = require("csv-parse");

const configs = [
  {
    tableName: "product",
    // filePath: "./seeds/testProduct.csv",
    filePath: "./seeds/product.csv",
    query:
      "INSERT INTO product (id, name, slogan, description, category, default_price, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
  },
  {
    tableName: "feature",
    // filePath: "./seeds/testfeatures.csv",
    filePath: "./seeds/features.csv",
    query:
      "INSERT INTO feature (id, product_id, feature, value) VALUES ($1, $2, $3, $4)",
  },
  {
    tableName: "related",
    // filePath: "./seeds/testRelated.csv",
    filePath: "./seeds/related.csv",
    query:
      "INSERT INTO related (id, current_product_id, related_product_id) VALUES ($1, $2, $3)",
  },
  {
    tableName: "style",
    // filePath: "./seeds/testStyles.csv",
    filePath: "./seeds/styles.csv",
    query:
      "INSERT INTO style (id, product_id, name, sale_price, original_price, default_style, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
  },
  {
    tableName: "sku",
    // filePath: "./seeds/testSkus.csv",
    filePath: "./seeds/skus.csv",
    query:
      "INSERT INTO sku (id, style_id, size, quantity) VALUES ($1, $2, $3, $4)",
  },
  {
    tableName: "photo",
    filePath: "./seeds/testPhotos.csv",
    filePath: "./seeds/photos.csv",
    query:
      "INSERT INTO photo (id, style_id, url, thumbnail_url) VALUES ($1, $2, $3, $4)",
  },
];

const seedDatabase = ({ tableName, filePath, query }, pool) => {
  return new Promise(async (resolve, reject) => {
    try {
      fs.createReadStream(filePath)
        .pipe(
          parse({
            cast: true,
            delimiter: ",",
            from_line: 2,
          })
        )
        .on("data", (row) => {
          let treatedRow = row.map((v) => (v === "null" ? null : v));
          if (tableName === "product" || tableName === "style") {
            const now = new Date();
            treatedRow = treatedRow.concat([now, now]);
          }
          pool.query(query, treatedRow).then(() => {});
        })
        .on("error", (err) => {
          console.error(err.message);
        })
        .on("end", () => {
          setTimeout(() => {
            resolve();
          }, 1000);
          console.log(`Seeding table ${tableName} completed`);
        });
    } catch (err) {
      reject(new Error(`Error in seeding table ${tableName}: ${err}`));
    }
  });
};

const cleanDatabase = async (client) => {
  const dbs = ["feature", "related", "sku", "photo", "style", "product"];
  // const dbs = ["related", "sku", "photo", "style"];
  for (let db of dbs) {
    await client.query(`DELETE FROM ${db}`);
  }
};

const main = async () => {
  // await cleanDatabase(pool);
  // for (const config of configs) {
  //   console.log("Start reading", config.tableName);
  //   await seedDatabase(config, pool);
  // }
  // client.release();
  console.log("START", performance.now());
  const client = await pool.connect();
  await client.query("BEGIN");
  const res = await seedDatabase(configs[1], client);
  await client.query("COMMIT");
  client.release();
  pool.end();
  console.log("END", performance.now());
};

main();
