# Thrive Driver-Client Project

## Backend
 - Node.js 8.15.0
 - MySQL 5.4

CREATE TABLE `users` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
)

CREATE TABLE `rides` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `cust_id` int(12) unsigned NOT NULL,
  `driver_id` int(12) unsigned DEFAULT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

Postman collection URL : https://www.getpostman.com/collections/756e7b3973dfee34d40a

Usage of api-ext library ( developed by me, https://www.npmjs.com/package/api-ext )

## Directory Structure
 - auth    : all auth APIs
 - cache   : cache support
 - env     : env variable support
 - model   : db models and more
 - ride    : all ride APIs
 - util    : cron and validate

## Usage
The panel supports login, new requests, confirm requests. A self contained sql file is added in the project root directory, with 5 drivers and 5 clients, to register either use postman or the curl below

curl -X POST \
  http://localhost:8080/register \
  -H 'Content-Type: application/json' \
  -d '{
	"name": "client1",
	"type": "client",
	"username" : "client1",
	"password" : "client1"
}'


## Run
After cloning, run these commands
```js
npm install
node app.js
```

# Frontend ( thrive-app ) : react source code
 - React.js
 - localStorage
 - Bootstrap

## Directory Structure
 - util    : configuration and Session Manager
 - pages   : login and list pages
 - section : components to be re-used

## Run
```js
cd thrive-app
npm install
npm start
```