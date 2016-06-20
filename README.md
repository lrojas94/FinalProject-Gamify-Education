[![Build Status](https://travis-ci.com/lrojas94/FinalProject-Gamify-Education.svg?token=6KrRQjwSNqJziNvd7Bfv&branch=master)](https://travis-ci.com/lrojas94/FinalProject-Gamify-Education)

# Before trying anything #

```node
npm install -g nodemon webpack concurrently bower typings typescript
```

Why?:
* **Bower** is used to handle front-end dependencies.
* **Nodemon** is used to track server-side changes.
* **Webpack** is used to build application using REACT and track front-end changes.
* **Concurrently** is to run Nodemon and Webpack together so that you can track changes on both, front-end and back-end

# To run: #
First install dependencies:
```node
npm install
```
Afterwards, feel free to run:
```node
npm start
```

## BASIC FLOW ##

* Express renders index.html with NO DATA FROM THE SERVER.
* The app can use AJAX to request something from the server API.
* Within itself, the app uses routes in order to handle different components and such.
