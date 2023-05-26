const dbConfig = require("./config/db.config.js");
const fs = require("fs");
const models = require("./models");
const { parse } = require("csv-parse");

const configs = [
  {
    tableName: "product",
    filePath: "./seeds/testProduct.csv",
    query:
      "INSERT INTO product (id, name, slogan, description, category, default_price, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
  },
  {
    tableName: "feature",
    filePath: "./seeds/testfeatures.csv",
    query:
      "INSERT INTO feature (id, product_id, feature, value) VALUES ($1, $2, $3, $4)",
  },
  {
    tableName: "related",
    filePath: "./seeds/testRelated.csv",
    query:
      "INSERT INTO related (id, current_product_id, related_product_id) VALUES ($1, $2, $3)",
  },
  {
    tableName: "style",
    filePath: "./seeds/testStyles.csv",
    query:
      "INSERT INTO style (id, product_id, name, sale_price, original_price, default_style, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
  },
  {
    tableName: "sku",
    filePath: "./seeds/testSkus.csv",
    query:
      "INSERT INTO sku (id, style_id, size, quantity) VALUES ($1, $2, $3, $4)",
  },
  {
    tableName: "photo",
    filePath: "./seeds/testPhotos.csv",
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
          pool.query(query, treatedRow).then(() => {
            setTimeout(() => {
              resolve();
            }, 1000);
          });
        })
        .on("error", (err) => {
          console.error(err.message);
        })
        .on("end", () => {
          console.log(`Seeding table ${tableName} completed`);
        });
    } catch (err) {
      reject(new Error(`Error in seeding table ${tableName}: ${err}`));
    }
  });
};

const cleanDatabase = async (client) => {
  const dbs = ["feature", "related", "sku", "photo", "style", "product"];
  for (let db of dbs) {
    await client.query(`DELETE FROM ${db}`);
  }
};

const main = async () => {
  await cleanDatabase(models.pool);
  for (const config of configs) {
    const res = await seedDatabase(config, models.pool);
  }
  // client.release();
  models.pool.end();
};

main();
