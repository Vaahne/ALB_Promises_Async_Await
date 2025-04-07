// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

function getUserData(id) {
    const dbs = {
      db1: db1,
      db2: db2,
      db3: db3
    };

    //  using Async/Await
    async function getData() {
      let getDB = await central(id);
      let data1 = await dbs[getDB](id);
      let data2 = await vault(id);
      let data = Object.assign({}, data1, data2);
      return data;
    }

    // using promises
    function usingPromises() {
      return central(id)
        .then((getDB) => {
          return dbs[getDB](id)
        })
        .then((data1) => {
          return vault(id).then((data2) => {
            let data;
            data = Object.assign({}, data1, data2);
            return data;
          })
        })
        .catch((err) => {
          console.error(err.message)
        })
    }
    return usingPromises();   // Data using promises

    // comment above line and uncomment below line to use async/await approach
    //   return getData();      // Data using async/await
}


// data from db1  Single promise
getUserData(2).then((data) => console.log(data));


// All data from 3 different dbs will be displayed in an array.
Promise.all([getUserData(3), getUserData(7), getUserData(9)])
  .then((msg) => {
    console.log(msg)
  })

// data from Allsettled 
Promise.allSettled([getUserData(1), getUserData(6)]).then((msg) => {
  console.log(msg)
})
