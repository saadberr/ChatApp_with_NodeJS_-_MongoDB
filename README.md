# ChatApp using Node.js and MongoDB :

## 1 - Introduction :

We will create a simple Chatroom with Node.js in back-end, and MongoDB to store conversation messages,
**Node.js and npm:** Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. npm is the package manager for Node.js.
**MongoDB:** MongoDB is a NoSQL database used to store the data for our app.


## 2 - How to use it :
## Start the server :
npm start

## Start the client:
by openning 'index.html'

## To start mongodb database container :
docker run --rm --name mongochat -d -p 27017:27017  mongo:latest

## Access container mongosh shell:
docker exec -it mongochat mongosh

## Create a db named chatdb and a collection inside it named messages :
use chatdb;
db.createCollection('messages');

