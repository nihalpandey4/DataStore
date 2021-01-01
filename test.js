const rimraf  = require("rimraf");

rimraf.sync("./customStore");

const DataStore = require("./datastore");

const datastore = new DataStore("./customStore");

let total= 0,success=0,fail=0

const result = ()=>{
    horizontalLine("Test case stats");
    console.log(`\nTotal test cases=${total}\n passed=${success} failed=${fail}\n\n`)
}

const obj = {
    name: "Apoorva",
    year: "4th",
  };
  

const horizontalLine =(text)=>console.log(`-----------------------------${text}--------------------------\n`);

console.log("\n")
//testing file path
const customFilePathTest = () => {
    total=total+1;
  const filePath = datastore.getFilePath();
  console.log("Checking path after passing path while creating an instance");
  if (filePath === "./customStore") {
    console.log("Custom file path feature working");
    success=success+1;
  } else {
    console.error("Custom file path feature not working");
    fail=fail+1;
  }
  console.log("\n");
};

const defaultFilePathTest = () => {
    total=total+1;
  console.log(
    "Checking path after not passing anything while creating an instance"
  );
  if (new DataStore().getFilePath() === "./Store") {
    console.log("Default file path feature working");
    success=success+1;
  } else {
    console.error("Default file path feature not working");
    fail=fail+1;
  }
  console.log("\n");
};

horizontalLine("File path testing")
customFilePathTest();
defaultFilePathTest();



//testing add unique key feature
const addUniqueKeyTest = ()=>{
    total=total+1;
    if(datastore.add("029","Nihal Kumar Pandey",100)===true){
        console.log("Unique key value pair adding feature working correctly")
        success=success+1;
    }
    else{
        fail=fail+1;
    }
    console.log("\n");
}

//modifying already present key
const addAlreadyPresentKeyTest = ()=>{
    total=total+1;
    if(datastore.add("029","Nishita")===false){
        success=success+1;
    }
    else{
        console.log("Key reinitialized");
        fail=fail+1;
    }
    console.log("\n");
}

//adding more than allowed key length
const addLargerKeyTest = ()=>{
    total=total+1;
    if(datastore.add("This is definitely more than 32 chars","Nishita")===false){
        success=success+1;
    }
    else{
        console.log("Key reinitialized");
        fail=fail+1;
    }
    console.log("\n");
}

horizontalLine("Adding key functionality test")
addUniqueKeyTest();
addAlreadyPresentKeyTest();
addLargerKeyTest();

//testing read operation

//finding key which exists
const readKey = ()=>{
    total=total+1;
    const value = datastore.read("029")
    if(value){
        console.log(`"029":"${value}" found successfully`);
        success=success+1;
    }
    else{
        fail=fail+1;
    }
    console.log("\n");
}

//finding key that doesn't exists
const readInvalidKey = ()=>{
    total=total+1;
    const value = datastore.read("0123441")
    if(!value){
        success=success+1;
    }
    else{
        console.log("Test case failed");
        fail=fail+1;
    }
    console.log("\n");
}

//finding key that expired
const readExpiredKey=()=>{
    total=total+1;
    datastore.add("006",obj,0);
    const value = datastore.read("006")
    if(!value){
        success=success+1;
    }
    else{
        console.log("Test case failed");
        fail=fail+1;
    }
    console.log("\n");
}

horizontalLine("Testing read operation")
readKey()
readInvalidKey()
readExpiredKey()


//testing delete operation

//deleting key which exists
const deleteKey = ()=>{
    total=total+1;
    if(datastore.delete("029")){
        success=success+1;
    }
    else{
        fail=fail+1;
    }
    console.log("\n");
}

//deleting key that doesn't exists
const deleteInvalidKey = ()=>{
    total=total+1;
    if(!datastore.delete("Nihal")){
        success=success+1;
    }
    else{
        console.log("Test case failed");
        fail=fail+1;
    }
    console.log("\n");
}

//deleting key that expired
const deleteExpiredKey=()=>{
    total=total+1;
    datastore.add("006",obj,0);
    if(!datastore.delete("006")){
        success=success+1;
    }
    else{
        console.log("Test case failed");
        fail=fail+1;
    }
    console.log("\n");
}

horizontalLine("Testing delete operation")
deleteKey()
deleteInvalidKey()
deleteExpiredKey()

result();