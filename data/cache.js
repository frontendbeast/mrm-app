import { AsyncStorage } from 'react-native';

import database from './database';

const cache = {
  get: async (node) => {
    let cached = await AsyncStorage.getItem(node);

    return new Promise((resolve, reject) => {
      if (cached) {
        resolve(JSON.parse(cached));
      } else {
        database.ref(`/${node}`).once('value', snap => {
          AsyncStorage.setItem(node, JSON.stringify(snap.val()));
          resolve(snap.val());
        })
        .catch((error) => {
          console.log(`error ${error}`);
          reject(error);
        });
      }
    });
  }
};

export default cache;
