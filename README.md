# Restaurant Ordering Application - Server and Database

Restaurant ordering application is a CRUD web application for restaurant management of customers, employees, and orders. This is the server and database of application.

## Current Deployment
Server is currently deployed, hosted on https://autumn-grass-7257.fly.dev, using Fly.io

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
node.js.
E.g. using brew package manager. Can be installed from https://nodejs.org/en/download. 
```
brew install node
```

Setup a mongodb cluster using https://www.mongodb.com/atlas/database.

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be
Clone repository.
```
git clone https://github.com/svihang8/food-app-backend.git
```
Install required packages.
```
npm i
```

To run locally, add .env file with required values and run following command.
```
nodemon app.js
```

## Running the tests
Testing was done using Postman.

## Deployment
To deploy using fly.
```
brew install fly
fly auth login
flyctl launch
fly deploy
```

## Built With

* [Node.js](https://nodejs.org/en/docs) - server environment.
* [npm](https://docs.npmjs.com/) - package manager.
* [Stripe](https://stripe.com/docs) - payment processing platform.
* [Fly](https://fly.io/docs/) - application deployment service.

## Contributing
To contribute, open issue on GitHub

## Authors
* **Vihang Shah** - https://github.com/svihang8 - *end to end application* - [svihang8](https://github.com/svihang8)
