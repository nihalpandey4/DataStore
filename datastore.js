const { LocalStorage } = require("node-localstorage");
const fs = require("fs");

const DEFAULT_FILEPATH = "./Store";
const MAX_KEY_LENGTH = 32;
const MAX_OBJECT_SIZE = 16; //In KB
const MAX_FILE_SIZE = 1024; // In MB
const DEFAULT_EXPIRY_TIME = 10 *60; //if no expiry time given

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
  add = (key, value, timeToLive = DEFAULT_EXPIRY_TIME) => {
    try {
      if (this.isMaxFileSizeExceeded()) {
        throw new Error(`Maximum file size exceeded: ${MAX_FILE_SIZE} MB`);
      }

      if (key.length > MAX_KEY_LENGTH) {
        throw new Error(`Key can be max ${MAX_KEY_LENGTH} characters!`);
      }
      if (this.localstorage.getItem(key)) {
        throw new Error("Key already exists.");
      }

      if (this.getSizeOfObject(value) > MAX_OBJECT_SIZE) {
        throw new Error(`Value can be max ${MAX_OBJECT_SIZE} KB`);
      }

      let timeToLiveDate = null;

      if (timeToLive >= 0) {
        const currentDate = new Date();
        currentDate.setSeconds(currentDate.getSeconds() + timeToLive);
        timeToLiveDate = currentDate;
      }

      const jsonObject = JSON.stringify({
        value,
        timeToLiveDate,
      });

      this.localstorage.setItem(key, jsonObject);

      console.log("Key-Value pair added.");
    } catch (error) {
      console.log(error.message);
    }
  };

  //Function to keep file size under limit
  isMaxFileSizeExceeded = () =>
    fs.statSync(this.location).size / (1024 * 1024) > MAX_FILE_SIZE;

  //Returns the size of object in KB
  getSizeOfObject = (object) =>
    Buffer.byteLength(JSON.stringify(object)) / 1000;

  //reading value when key is passed as argument
  read(key) {
    try {
      const stringValue = this.localstorage.getItem(key);

      if (!stringValue) {
        throw new Error("Key not found!");
      }

      // To convert string to json object
      let { value, timeToLiveDate } = JSON.parse(stringValue);
      if (timeToLiveDate) {
        const currentDate = new Date();
        timeToLiveDate = new Date(timeToLiveDate); // To convert date string to date object

        if (timeToLiveDate < currentDate) {
          throw new Error("Key value pair is expired!");
        }
      }

      console.log("Value: " + JSON.stringify(value));
    } catch (error) {
      console.log(error.message);
    }
  }


  //delete key value pair
   delete(key) {
    try {
        const localstorage = this.localstorage;

        const stringValue = localstorage.getItem(key);

        if (!stringValue) {
            throw new Error("Key not found!");
        };

         // To convert string to json object
        const jsonValue = JSON.parse(stringValue);

        let {
            value,
            timeToLiveDate
        } = jsonValue;

        if (timeToLiveDate) {
            const currentDate = new Date();
            timeToLiveDate = new Date(timeToLiveDate); // To convert date string to date object

            if (timeToLiveDate < currentDate) {
                throw new Error("Key value pair is expired!");
            };
        };

        localstorage.removeItem(key);
        console.log(`Deleted key: ${key}, value: ${JSON.stringify(value)}`);

    } catch (error) {
        console.log(error.message);
    }
}

}

module.exports = DataStore;
