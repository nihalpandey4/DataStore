const DataStore= require("./datastore");

const datastore = new DataStore("./customStore");

 datastore.add("031","Nishkarsh",01);
// datastore.read("031");
datastore.delete("031");