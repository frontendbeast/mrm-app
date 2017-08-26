import { AsyncStorage } from 'react-native';

import { merge, pickBy } from 'lodash';

import database from './database';

const cache = {
  getByAttribute: async (node, field, value, limit) => {
    const fieldName = `fields.${field}`;

    const options = {
      [fieldName]: value,
      content_type: node.slice(0, -1),
    };

    if (limit) {
      options.limit = limit;
    }

    const cached = await AsyncStorage.getItem(options.content_type);
    const results = (cached) ? JSON.parse(cached) : {};
    const result = pickBy(results, (item, id) => { return item[field] === value; });

    return (Object.keys(result).length) ? new Promise((resolve, reject) => { resolve(result); }) : _dbGet(options);
  },

  getAll: async (node) => {
    const options = {
      content_type: node.slice(0, -1),
    };

    const cached = await AsyncStorage.getItem(options.content_type);

    return (cached) ? new Promise((resolve, reject) => { resolve(JSON.parse(cached)); }) : _dbGet(options);
  }
};

function _dbGet(options) {
  return new Promise(async(resolve, reject) => {
    const cached = await AsyncStorage.getItem(options.content_type);

    database
      .getEntries(options)
      .then(results => {
        const items = {};

        results.items.forEach((item) => {
          let object = {
            ...item.fields
          };

          Object.entries(object).forEach(([key, value]) => {
            if (value.sys) {
              results.includes.Entry.forEach((include) => {
                if (value.sys.id === include.sys.id) {
                  object[key] = include.fields;
                }
              });
            }
          });

          items[item.sys.id] = object;
        });

        const result = (cached) ? JSON.parse(cached) : {};
        const merged = merge(result, items);

        AsyncStorage.setItem(options.content_type, JSON.stringify(merged));

        resolve(items);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export default cache;
