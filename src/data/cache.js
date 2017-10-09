import { AsyncStorage } from 'react-native';

import { merge, pickBy } from 'lodash';

import database from './database';

const cache = {
  clear: async (node, field, value) => {
    const contentType = node.slice(0, -1);
    const cached = await AsyncStorage.getItem(contentType);

    let results = (cached !== null && field && value) ? JSON.parse(cached) : {};

    if (field && value) {
      Object.entries(results).forEach(([id, item]) => {
        if ((field === 'id' && id === value) || item[field] === value) {
          delete results[id];
        }
      });
    }

    return new Promise(async(resolve, reject) => {
      if (Object.keys(results).length) {
        await AsyncStorage.setItem(contentType, JSON.stringify(results));
      } else {
        await AsyncStorage.removeItem(contentType);
      }
      resolve();
    });
  },

  getAll: async (node) => {
    const options = {
      content_type: node.slice(0, -1),
    };

    const cached = await AsyncStorage.getItem(options.content_type);

    return (cached !== null) ? new Promise((resolve, reject) => { resolve(JSON.parse(cached)); }) : _dbGet(options);
  },

  getByAttribute: async (node, field, value, limit) => {
    const fieldType = (field === 'id') ? 'sys' : 'fields';
    const fieldName = `${fieldType}.${field}`;

    const options = {
      [fieldName]: value,
      content_type: node.slice(0, -1),
    };

    if (limit) {
      options.limit = limit;
    }

    const cached = await AsyncStorage.getItem(options.content_type);
    const results = (cached !== null) ? JSON.parse(cached) : {};
    const result = pickBy(results, (item, id) => { return (field === 'id') ? id === value : item[field] === value; });

    return (Object.keys(result).length) ? new Promise((resolve, reject) => { resolve(result); }) : _dbGet(options);
  },

  getSettings: () => {
    const optionsPageList = {
      content_type: 'page',
      select: 'fields.title,fields.appScreen,fields.image',
    };

    const optionsSettings = {
      content_type: 'settings',
      select: 'fields',
      limit: 1,
      include: 0,
    };

    return Promise.all([_dbGet(optionsPageList, 'pageList'), _dbGet(optionsSettings, 'settings')]);
  },

  getSettingsCache: async () => {
    const pageList = await AsyncStorage.getItem('pageList');
    const settings = await AsyncStorage.getItem('settings');

    let cached = undefined;

    if (pageList !== null && settings !== null) {
      cached = [JSON.parse(pageList), JSON.parse(settings)];
    }

    return cached;
  },
};

function _dbGet(options, saveAs) {
  return new Promise(async(resolve, reject) => {
    const cacheName = (saveAs) ? saveAs : options.content_type;
    const cached = await AsyncStorage.getItem(cacheName);

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
              results.includes[value.sys.type].forEach((include) => {
                if (value.sys.id === include.sys.id) {
                  object[key] = include.fields;
                }
              });
            }
          });

          items[item.sys.id] = object;
        });

        const result = (cached  !== null) ? JSON.parse(cached) : {};
        const merged = merge(result, items);

        AsyncStorage.setItem(cacheName, JSON.stringify(merged));

        resolve(items);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export default cache;
