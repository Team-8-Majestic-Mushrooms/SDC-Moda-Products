CREATE TABLE product (
  id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  slogan VARCHAR(255),
  description TEXT,
  category VARCHAR(50),
  default_price NUMERIC(10, 2),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY(id)
);

CREATE TABLE feature (
  id INT NOT NULL,
  feature VARCHAR(50) NOT NULL,
  value VARCHAR(255),
  product_id INT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_product
    FOREIGN KEY(product_id)
      REFERENCES product(id)
);

CREATE TABLE related (
  id INT NOT NULL,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_product
    FOREIGN KEY(current_product_id)
      REFERENCES product(id)
);

CREATE TABLE style (
  id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  original_price NUMERIC(10, 2) NOT NULL,
  sale_price NUMERIC(10, 2),
  default_style BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  product_id INT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_product
    FOREIGN KEY(product_id)
      REFERENCES product(id)
);

CREATE TABLE photo (
  id INT NOT NULL,
  thumbnail_url VARCHAR(255),
  url VARCHAR(255),
  style_id INT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_style
    FOREIGN KEY(style_id)
      REFERENCES style(id)
);

CREATE TABLE sku (
  id INT NOT NULL,
  quantity INT NOT NULL,
  size VARCHAR(50) NOT NULL,
  style_id INT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_style
    FOREIGN KEY(style_id)
      REFERENCES style(id)
);


-- DROP TABLE product CASCADE;
-- DROP TABLE feature CASCADE;
-- DROP TABLE related CASCADE;
-- DROP TABLE style CASCADE;
-- DROP TABLE photo CASCADE;
-- DROP TABLE sku CASCADE;
