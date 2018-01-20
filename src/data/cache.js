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
          // Process assets
          results.assets.forEach(asset => {
            // Keep track of content types to update indexes
            if(!types.includes('asset')) {
              types.push('asset');
            }

            // Format data
            update[asset.sys.id] = _processItem(asset, 'asset');
          });

          // Process entries
          results.entries.forEach(entry => {
            const type = entry.sys.contentType.sys.id;

            // Keep track of content types to update indexes
            if(!types.includes(type)) {
              types.push(type);
            }

            // Format data
            update[entry.sys.id] = _processItem(entry, type);
          });

          const removal = [];

          // Create an array of assets being removed
          results.deletedAssets.forEach(async asset => {
            removal.push(asset.sys.id);
          });

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

              if (removal.length) {
                await _removeItems(removal);
              }

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

function _processItem(item, type) {
  const data = {
    type: type
  };

  // Remove sys and localisation
  Object.entries(item.fields).forEach(([key, value]) => {
    const content = value['en-GB'];
    // If linked entry, store ID else value
    data[key] = (content.sys) ? content.sys.id : content;

    if (content.sys) {
      data[key] = content.sys.id;
    } else if (Array.isArray(content)) {
      data[key] = [];
      content.map(listItem => {
        if (listItem.sys) {
          data[key].push(listItem.sys.id);
        }
      });
    } else {
      data[key] = content;
    }
  });

  return data;
}

export default cache;
