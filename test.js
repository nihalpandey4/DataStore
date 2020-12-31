const DataStore= require("./datastore");

const datastore = new DataStore();

const data = {
    "020":"Nishita",
    "012":"Apoorva"
}

//console.table(datastore.writeData(data));
console.table(datastore.readData("020"));