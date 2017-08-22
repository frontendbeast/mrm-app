import { AsyncStorage } from 'react-native';

import database from './database';

const cache = {
  get: async (node) => {
    let cached = await AsyncStorage.getItem(node);

    return new Promise((resolve, reject) => {
      if (cached) {
        resolve(JSON.parse(cached));
      } else {
        database
          .getEntries({content_type: node.slice(0, -1)})
          .then(results => {
            let items = {};

            results.items.forEach((item) => {
              let object = {
                ...item.fields
              };

              Object.entries(object).forEach(([key, value]) => {
                if (value.sys) {
                  results.includes.Entry.forEach((include) => {
                    if (value.sys.id == include.sys.id) {
                      object[key] = include.fields;
                    }
                  });
                }
              });

              items[item.sys.id] = object;
            });

            AsyncStorage.setItem(node, JSON.stringify(items));
            resolve(items);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      }
    });
  }
};

export default cache;
