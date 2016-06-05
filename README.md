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


### FOR TYPESCRIPT ###
install typings globally: 
``` npm install -g typings typescript ```

Install react typings:
```
typings install dt~react --save --global && typings install dt~react-dom --save --global
``` 

Name your files ```.tsx``` instead of ```.jsx```.
