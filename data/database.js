import * as firebase from 'firebase';

firebase.initializeApp({
  databaseURL: 'https://mrm-app.firebaseio.com/',
});

const database = firebase.database();

export default database;
