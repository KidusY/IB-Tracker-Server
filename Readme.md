# Ib-Tracker Server


## Description

This end point provides information for the IB-tracker client side. The users are able to post(add) products, users, inventory; Get products, users, inventory, logs.

The users make a post request to the /api/login end-point to get the auth token and other user info  


## Set Up

First install the package...

### npm i or npm install 

Setup .env files

For local use...
### postgresql://postgres@localhost/ib_tracker


Run server...

### npm run dev or npm start


## Endpoints

### End points 

#### /api/users
    - Gets the user info
    - Post the user info
    - Update the user info
    - Delete the user info

#### /api/product
    - Gets the products info
    - Post the products info
    - Update the products info
    - Delete the products info

#### /api/login    
    - Post the user info and verify user info for login


#### /api/inventory
    - Gets the inventory info
    - Post the inventory info
    - Update the inventory info
    - Delete the inventory info

#### /api/logs
    - Gets the logs info
    - Post the logs info
   