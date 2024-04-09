CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    password text NOT NULL,
    email text UNIQUE NOT NULL,
    address text,
    city text, 
    state text,
    zipcode text,
    country text,
    date_joined timestamp DEFAULT (now())
); 
 
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id int REFERENCES users(id),
    order_price decimal(7,2),
    date_created timestamp DEFAULT (now())
);

CREATE TABLE order_products (
    order_id int REFERENCES orders(id),
    product_id int REFERENCES products(id),
    quantity int DEFAULT 1, 
    price decimal(7,2)
);

CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
);

CREATE TABLE cart_products (
    cart_id INT REFERENCES carts(id),
    product_id INT REFERENCES products(id),
    quantity INT DEFAULT 1
);

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
    description TEXT NOT NULL,
    price decimal(7, 2) NOT NULL,
    image_url TEXT
);

--INSERT INTO products (id, name, description, price, image_url)
--VALUES('') 