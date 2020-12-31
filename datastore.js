const {LocalStorage} = require("node-localstorage");
const fs = require("fs");

const DEFAULT_FILEPATH = "./Store";
const MAX_KEY_LENGTH = 32;

class DataStore {
  constructor(location) {
    this.location = location || DEFAULT_FILEPATH;
    this.localstorage = new LocalStorage(this.location);
  }

  /*
        To add a key-value pair in local Database
        @param {str}: key 
        @param {obj}: value
        @param {integer}: timeToLive - default null
    */
  add=(key, value) =>{
    try {
      if (key.length > MAX_KEY_LENGTH) {
        throw new Error(`Key can be max ${MAX_KEY_LENGTH} characters!`);
      }

      if (this.localstorage.getItem(key)) {
        throw new Error("Key already exists.");
      }

      const jsonObject = JSON.stringify({
        value,
      });
      this.localstorage.setItem(key, jsonObject);

      console.log("Key-Value pair added.");
    } catch (error) {
      console.log(error.message);
    }
  }

}

module.exports = DataStore;
