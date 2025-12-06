--creating database
CREATE DATABASE IF NOT EXISTS ecommerce_system;
USE ecommerce_system;
--user table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    house_no VARCHAR(50) NOT NULL,
    street_no VARCHAR(50) NOT NULL,
    post_office VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    pincode VARCHAR(6) NOT NULL,
    mobile_no VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
--products table
CREATE TABLE IF NOT EXISTS products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0
    
);
--cart items table
--Purpose: Stores items the user has added to their shopping cart before checkout.
CREATE TABLE IF NOT EXISTS cart_items(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    UNIQUE KEY user_product(user_id,product_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,--If the user account is deleted → his entire cart is deleted.
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT--Cannot delete a product if it is present in a cart.
);
--orders table
--Purpose: Stores the main order details after the user clicks “Place Order”.
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
--order items table
--Purpose: Stores the detailed list of products inside each order.
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price_each DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

INSERT INTO products (name, manufacturer, description, price, stock) VALUES
('Wireless Earbuds', 'Boat', 'Bluetooth earbuds with 20-hour battery life', 1499.00, 30),
('Smartphone Charger 25W', 'Samsung', 'Fast USB-C charger', 899.00, 50),
('Bluetooth Speaker', 'Sony', 'Portable speaker with deep bass', 2999.00, 20),
('Gaming Mouse', 'Logitech', 'High precision gaming mouse 6400 DPI', 1299.00, 40),
('Mechanical Keyboard', 'Redgear', 'RGB backlit mechanical keyboard', 2599.00, 25),
('Laptop Backpack', 'Wildcraft', 'Waterproof laptop backpack 15.6-inch', 1999.00, 15),
('LED Desk Lamp', 'Philips', 'Adjustable LED lamp with touch control', 999.00, 30),
('Fitness Smartwatch', 'Noise', 'Heart rate monitor + sleep tracking', 3499.00, 18),
('Portable Power Bank 10000mAh', 'Mi', 'Fast-charging power bank', 1299.00, 60),
('USB LED Light', 'Generic', 'Mini USB LED light for laptops', 99.00, 100),
('Running Shoes', 'Puma', 'Lightweight breathable running shoes', 2499.00, 20),
('Cotton Hoodie', 'H&M', 'Soft winter hoodie', 1999.00, 25),
('Coffee Mug', 'ClayArt', '350ml ceramic coffee mug', 199.00, 80),
('Notebook Set (3 pcs)', 'Classmate', 'Premium ruled notebooks', 249.00, 100),
('Ball Pen Pack (5 pcs)', 'Reynolds', 'Smooth writing ball pens', 59.00, 150);
