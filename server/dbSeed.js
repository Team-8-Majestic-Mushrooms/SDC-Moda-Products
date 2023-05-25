const configs = [
  {
    tableName: "product",
    filePath: "./seeds/testProduct.csv",
    query:
      "INSERT INTO product (id, name, slogan, description, category, default_price) VALUES ($1, $2, $3, $4, $5, $6)",
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
      "INSERT INTO style (id, product_id, name, sale_price, original_price, default_style) VALUES ($1, $2, $3, $4, $5, $6)",
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
const dbConfig = require("./config/db.config.js");
const fs = require("fs");
const models = require("./models");
const papa = require("papaparse");

const seedDatabase = async ({ tableName, filePath, query }, client) => {
  try {
    const readStream = fs.createReadStream(filePath);

    papa.parse(readStream, {
      header: true, // To skip header
      step: (row) => {
        const rowObj = row.data;
        const rowArr = Object.keys(row.data).map((key) => row.data[key]);

        client.query(query, rowArr).catch((err) => {
          console.error(`row data insert to ${tableName} table failed`);
        });
      },
      complete: (results, file) => {
        console.log(`${tableName} table created successfully!`);
      },
    });
  } catch (err) {
    console.error(`Error in seeding table ${tableName}: ${err}`);
  }
};

const cleanDatabase = async (client) => {
  const dbs = ["feature", "related", "sku", "photo", "style", "product"];
  for (let db of dbs) {
    await client.query(`DELETE FROM ${db}`);
  }
};

const main = async () => {
  const client = await models.pool.connect();
  await cleanDatabase(client);
  for (const config of configs) {
    await seedDatabase(config, client);
  }
  client.end();
};

main();
