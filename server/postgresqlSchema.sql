DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS feature;
DROP TABLE IF EXISTS related;
DROP TABLE IF EXISTS style CASCADE;
DROP TABLE IF EXISTS photo;
DROP TABLE IF EXISTS sku;

CREATE TABLE product (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  slogan VARCHAR(255),
  description TEXT,
  category VARCHAR(50),
  default_price NUMERIC(15, 2),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE feature (
  id INT PRIMARY KEY NOT NULL,
  feature VARCHAR(50) NOT NULL,
  value VARCHAR(255),
  product_id INT NOT NULL,
  CONSTRAINT fk_product
    FOREIGN KEY(product_id)
      REFERENCES product(id)
);

CREATE TABLE related (
  id INT PRIMARY KEY NOT NULL,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  CONSTRAINT fk_product
    FOREIGN KEY(current_product_id)
      REFERENCES product(id)
);

CREATE TABLE style (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  original_price NUMERIC(15, 2) NOT NULL,
  sale_price NUMERIC(15, 2),
  default_style BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  product_id INT NOT NULL,
  CONSTRAINT fk_product
    FOREIGN KEY(product_id)
      REFERENCES product(id)
);

CREATE TABLE photo (
  id INT PRIMARY KEY NOT NULL,
  thumbnail_url VARCHAR(255),
  url VARCHAR(255),
  style_id INT NOT NULL,
  CONSTRAINT fk_style
    FOREIGN KEY(style_id)
      REFERENCES style(id)
);

CREATE TABLE sku (
  id INT PRIMARY KEY NOT NULL,
  quantity INT NOT NULL,
  size VARCHAR(50) NOT NULL,
  style_id INT NOT NULL,
  CONSTRAINT fk_style
    FOREIGN KEY(style_id)
      REFERENCES style(id)
);



