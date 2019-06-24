/*
DB - ORDER "SCHEMA"
 {
  oid: {
    packages: {
      pid: { hospitalId: int, products: [], flightId: int, status: string }  
      pid:
      pid:
    }
  },

  ...
 }
*/

//Could potentially move DB to different file as number of "tables"/"models" grows, but keeping here for mvp
const db = {}
let lastOrderId = 0;
let lastPackageId = 0;

//FUNCTIONS FOR ADDING AN ORDER TO THE DB
function addOne(orderData) {
  console.log("adding order data to db:", orderData)
  //create new order Id and add it to the db/increment the id tracker
  let orderId = lastOrderId + 1;
  db[orderId] = { packages: {} }
  lastOrderId++;

  //create empty order summary object
  let orderSummary = { id: orderId, packages: [] }

  //for each package in orderm add to order summary object
  for(let pkg of orderData) {
    let currPackageId = lastPackageId + 1;
    db[orderId].packages[currPackageId] = pkg;
    orderSummary.packages.push(currPackageId)
    lastPackageId++;
  }

  console.log("added order to database:", db)
  //return orderSummary for front end
  return orderSummary;
}

module.exports = {
  addOne
}