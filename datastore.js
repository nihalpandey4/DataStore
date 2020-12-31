const fs = require("fs");

class Datastore {
  //initialising datastore with user given path or else default one
  constructor(path = "default.json") {
    this.path = path;
    this.data = {};
    
    try {
        const jsonData = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        this.data = { ...this.data, ...jsonData };
    } 
    catch (e) {
      fs.writeFile(this.path, JSON.stringify(this.data), (err) => {
        if (err) console.log(err);
        console.log(
          `File with path=${this.path} not present therefore creating new one`
        );
      });
    }

  }

  //updating data property
  updateData = () => {
    const jsonData = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    this.data = { ...this.data, ...jsonData };
    return this.data;
  };

  //reading value from data
  readData = (key)=>{
      this.updateData();
      return this.data[key];
  }

  //writing into file
  writeData = (newData) => {
    console.log(newData);
    let message = {};

    if (!newData) {
      message.error = "Empty object received";
      return message;
    }

    try {
      this.updateData();
    } catch (e) {
      console.log(e);
    }

    Object.keys(newData).forEach((key) => {
      if (this.data[key]) {
        message.error = `Aborting write operation as update is not allowed for property : "${key}"`;
      }
    });
    if (message.error) {
      return message;
    }

    this.data = { ...this.data, ...newData };
    fs.writeFile(this.path, JSON.stringify(this.data), (err) => {
      if (err) console.log(err);
      console.log("changes completed");
    });
    message.success = "Changes completed successfully"
    return message;
  };

  deleteData =(key)=>{
      
  }
  
}

module.exports = Datastore;
