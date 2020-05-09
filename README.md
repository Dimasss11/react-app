# react-app

## How to use
Make sure you have Node.js and the npm  installed
```
$ git clone https://github.com/Dimasss11/react-app.git 
$ cd react-app
$ npm install
$ npm start
```
And point your browser to http://localhost:3000

## Configuration (database)
src/database/config.js
```
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
```