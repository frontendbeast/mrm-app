import { AsyncStorage } from 'react-native';

import database from './database';

const cache = {
  getByType: async (type) => {
    return new Promise(async(resolve, reject) => {
      _getItem(type).then(item => {
        const array = (item !== null) ? JSON.parse(item) : [];
        _getItems(array).then(items => {
          const results = {};

          items.forEach(([key, value]) => {
            results[key] = (!value) ? {} : JSON.parse(value);
          });

          resolve(results);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
    });
  },

  sync: async () => {
    const nextSyncToken = await _getItem('nextSyncToken');
    const options = (nextSyncToken !== null) ? {'nextSyncToken': nextSyncToken} : {'initial': true};

    const set = [];
    const types = [];

    const update = {};
    const remove = {};

    return new Promise(async(resolve, reject) => {

      database
        .sync(options)
        .then(async results => {
          // console.log(results);

          // Process entries
          results.entries.forEach(entry => {
            const type = entry.sys.contentType.sys.id;

            // Keep track of content types to update indexes
            if(!types.includes(type)) {
              types.push(type);
            }

            // Format data
            update[entry.sys.id] = _processEntry(entry);
          });

          const removal = [];

          // Create an array of entries being removed
          results.deletedEntries.forEach(async entry => {
            removal.push(entry.sys.id);
          });

          // Get details of each entry being removed
          _getItems(removal).then(entries => {

            entries.forEach(([key, value]) => {
              remove[key] = (!value) ? [] : JSON.parse(value);

              if(!types.includes(remove[key].type)) {
                types.push(remove[key].type);
              }
            });

            const indexes = {};

            // Get current indexes for content types
            _getItems(types).then(async typesIndexes => {

              typesIndexes.forEach(([key, value]) => {
                indexes[key] = (!value) ? [] : JSON.parse(value);
              });

              Object.entries(update).forEach(([key, entry]) => {
                // If new entry, add to index
                if(!indexes[entry.type].includes(key)) {
                  indexes[entry.type].push(key);
                }
              });

              // Remove deleted entries from index
              Object.entries(remove).forEach(([key, entry]) => {
                indexes[entry.type] = indexes[entry.type].filter(item => item != key);
              });

              // Add indexes to update
              Object.entries(indexes).forEach(([key, value]) => {
                update[key] = value;
              });

              // console.log('UPDATE', update);
              // console.log('REMOVE', remove);

              // Track sync
              update['nextSyncToken'] = results.nextSyncToken;

              // Save to AsyncStorage
              Object.entries(update).forEach(([key, value]) => {
                const data = (typeof value === 'object' || typeof value === 'array') ? JSON.stringify(value) : value;
                set.push([key, data]);
              });

              // console.log('TYPES', types);
              // console.log('SET', set);

              await _removeItems(removal);
              await _setItems(set);

              resolve(types);
            });

          });

        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }
};

async function _removeItems(array) {
  return await AsyncStorage.multiRemove(array);
}

async function _getItems(array) {
  return await AsyncStorage.multiGet(array);
}

async function _getItem(id) {
  return await AsyncStorage.getItem(id);
}

async function _setItems(array) {
  return await AsyncStorage.multiSet(array);
}

function _processEntry(entry) {
  const item = {
    type: entry.sys.contentType.sys.id
  };

  // Remove sys and localisation
  Object.entries(entry.fields).forEach(([key, value]) => {
    item[key] = value['en-GB'];

    // If linked entry e.g. asset or venue
    if (item[key].sys) {
      const include = {};

      // Remove sys and localisation
      Object.entries(item[key].fields).forEach(([objectKey, object]) => {
        include[objectKey] = object['en-GB'];
      });

      item[key] = include;
    }
  });

  return item;
}

export default cache;
