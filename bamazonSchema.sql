CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(150) NOT NULL,
    department_name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10),
    PRIMARY KEY(item_id)
);
 
SELECT * FROM products;