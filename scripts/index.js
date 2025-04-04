// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };
 
  async function getData(id){

    let getDB = await central(id);
    let data1 = await dbs[getDB](id);
    let data2 = await vault(id);
    
    let data = Object.assign(data1,data2);
    console.log( data);
   return data;
  }
   return getData(id);
}

console.log(getUserData(8));