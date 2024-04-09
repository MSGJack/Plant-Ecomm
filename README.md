Plant E-commerce

Genreal Information

This emommerce app allows a user to perform any CRUD operation such as regiester for an account, login, browse through products, add product to cart and complete a purchase. Went with a plant theme since there's plenty of nurseries in my area and I do enjoy flowers as well. Plus I wanted to use more desert base plants since they're usually overlooked and there is a growing movement of people moving away from lawns to desert gardens. 

Technology Used: JavaScript, PostgreSQL, Express, Node, React, ReactBootStrap.

Installation
For local use, use npm in both the client and server files. Once installed, use npm start for server and npm run dev for client. 

Server

Create an .env file with these varialbes

DB_USER = POSTGRES_USER

DB_HOST = localhost For me, it was localhost:3001, make sure the client host is a differnet port number like 8080

DB_DATABASE = POSTGRES_DATABASE

DB_PASSWORD = POSTGRES_PASSWORD

DB_PORT = 5432

TOKEN_SECRET = YOUR_TOKEN This is for the jsonweb token. Can be any length you want.

SECRET_KEY = YOUR_KEY This is for stripe payments.

Client
Create an env for the client
VITE_KEY = Your_Key  This is the stripe publishable key. Use import.meta.env.VITE_KEY in the file where the key is suppose to be. 
