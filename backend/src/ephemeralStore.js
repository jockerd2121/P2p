const store = new Map();
const ephemeralStore = {
  save: (key, value) => store.set(key, value),
  get: (key) => store.get(key),
  delete: (key) => store.delete(key),
};
module.exports = { ephemeralStore };