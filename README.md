# Before trying anything #

```node
npm install -g nodemon webpack concurrently bower typings typescript
```

Why?:
* **Bower** is used to handle front-end dependencies.
* **Nodemon** is used to track server-side changes.
* **Webpack** is used to build application using REACT and track front-end changes.
* **Concurrently** is to run Nodemon and Webpack together so that you can track changes on both, front-end and back-end

Though **mongoose** is installed as a dependency, there's no actual implementation of a mongo connection. Feel free to remove/change it.

# To run: #
First install dependencies:
```node
npm install
bower install
typings install
```
Afterwards, feel free to run:
```node
npm start
```

## BASIC FLOW ##

* Express renders index.html with NO DATA FROM THE SERVER.
* The app can use AJAX to request something from the server API.
* Within itself, the app uses routes in order to handle different components and such.


### PROBLEMS WITH PQ-NATIVE? ###
Install the following (Debian commands)
```node
sudo apt-get install python-psycopg2
sudo apt-get install libpq-dev
sudo apt-get install build-essential
```
