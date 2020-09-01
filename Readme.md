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
   
   
 # IB-Tracker-Client  
## This the client side for IB Traker project 

### [Demo](https://ib-tracker-client.vercel.app)

## Landing page
![Image description](https://github.com/KidusY/IB-Tracker-Client/blob/master/screenShots/landing%20page.PNG)

## HomePage
![Image description](https://github.com/KidusY/IB-Tracker-Client/blob/master/screenShots/home.PNG)

## Login
![Image description](https://github.com/KidusY/IB-Tracker-Client/blob/master/screenShots/login.PNG)

## Products
![Image description](https://github.com/KidusY/IB-Tracker-Client/blob/master/screenShots/products.PNG)

## Inventory
![Image description](https://github.com/KidusY/IB-Tracker-Client/blob/master/screenShots/inventory.PNG)

## Logs
![Image description](https://github.com/KidusY/IB-Tracker-Client/blob/master/screenShots/logs.PNG)

## Users
![Image description](https://github.com/KidusY/IB-Tracker-Client/blob/master/screenShots/users.PNG)

