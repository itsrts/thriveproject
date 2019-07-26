#Thrive Driver-Client Project

##Backend
Node.js 8.15.0
MySQL 5.4

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

Usage of api-ext library ( developed by me )

##Directory Structure
auth    : all auth APIs
cache   : cache support
env     : env variable support
model   : db models and more
ride    : all ride APIs
util    : cron and validate

thrive-app : react source code

##Usage
The panel supports login, new requests, confirm requests.
To register either use postmane or curl below

curl -X POST \
  http://localhost:8080/register \
  -H 'Content-Type: application/json' \
  -d '{
	"name": "client1",
	"type": "client",
	"username" : "client1",
	"password" : "client1"
}'

##Run
After cloning, run these commands
`npm install`
`node app.js`

#Frontend
React.js
localStorage

##Directory Structure
util    : configuration and Session Manager
pages   : login and list pages
section : components to be re-used

##Run
`cd thrive-app`
`npm start`
