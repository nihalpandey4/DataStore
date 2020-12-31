const DataStore= require("./datastore");

const datastore = new DataStore("./customStore");

console.log(datastore.add("032","Nishkarsh"));
console.log(datastore.read("029"))
//console.log(datastore.delete("029"));