const helpers = require('./helpers')
const Order = require('../database/order.js')

//ORDER PROCESSING FUNCTIONS
async function processOrder(orderData) {
  console.log("processing order: ", orderData)

  //parse destination + cart data from incoming request
  const destinationHospital = orderData.hospital;
  const cart = orderData.cart;

  //break apart order into packages w/ weights <= 1.8kg
  const packages = createPackages(destinationHospital, cart)
  console.log("created packages: ", packages)
  
  //assign each package to a different flight
  let flightAssignments

  try { 
    flightAssignments = await assignOrderPackagesToFlights(packages);
  } 
  catch(e) {
    throw new Error(`failed to assign packages to flights due to: ${e}`)
  }

  console.log("assigned packages to flights: ", flightAssignments)
  
  //confirm each flight
  const flights = flightAssignments.map((assignment) => {
    return assignment.id;
  })

  try { 
    await confirmFlightsForOrder(flights)
  } 
  catch(e) {
    throw new Error(`failed to assign packages to flights due to: ${e}`)
  }

  console.log("confirmed flights")

  //add packages to DB and return order summary to client
  const finalOrderData = packages.map((package, index) => {
    return Object.assign(package, {flightId: flights[index], status: "CONFIRMED"})
  })

  const orderSummary = Order.addOne(finalOrderData)
  return orderSummary;
}

//NOTE: this is an mvp/brute force solution and doesnt account for any distribution optimizations;
//should work for cart with multiple products!
function createPackages(hospital, cart) {
  let weightLimitPerPackage = 1800;
  //for greedy solution could have sorted by weight, but thought alphabetical order would suffice for v1
  let productsInOrder = Object.keys(cart).sort();
  let numOfItemsRemainingInCart = calcNumOfItems(cart);
  let packages = [];

  while(numOfItemsRemainingInCart > 0) {
    let emptyPackage = { hospital: hospital.id, products: []}
    let filledPackage = fillPackage(productsInOrder, cart, emptyPackage, 0, weightLimitPerPackage)
    packages.push(filledPackage)
    numOfItemsRemainingInCart -= filledPackage.products.length;
  }

  return packages;
}

//determine number of items in cart
function calcNumOfItems(cart) {
  let totalItems = 0;

  for(let product in cart) {
    let productQuantity = cart[product].units_requested;
    totalItems += productQuantity
  }

  return totalItems;
}

//fill packages with items from cart
function fillPackage(productsInOrder, cart, currPackage, currPackageWeight, weightLimit) {
  //helper func
  function filler() {
    if(currPackageWeight === weightLimit) {
      return;
    }

    for(let i = 0; i < productsInOrder.length; i++) {
      let currProduct = productsInOrder[i];

      if(cart[currProduct].units_requested > 0 && currPackageWeight + cart[currProduct].mass_g <= weightLimit){
        cart[currProduct].units_requested--;
        currPackage.products.push(cart[currProduct].id)
        currPackageWeight += cart[currProduct].mass_g
        filler();
      } 
    }

    return;
  }

  filler();
  return currPackage;
}

//assigns order packages to flights once packages are filled
async function assignOrderPackagesToFlights(packages) {
  let assignments = [];

  for(let i = 0; i < packages.length; i++) {
    let currPackage = packages[i];
    let packageAssignment
    
    try {
      packageAssignment = await assignPackageToFlight(currPackage);
    }
    catch(e) {
      throw new Error(`unable to assign package to flight due to: ${e}`)
    }

    assignments.push(packageAssignment)
  }

  return assignments;
}

//helper
function assignPackageToFlight(package) {
  return helpers.post('flight', package);
}

//confirm flights for order
async function confirmFlightsForOrder(flights) {
  for(let flightId of flights) {
    
    try {
      await confirmFlight(flightId)
    }
    catch(e) {
      throw new Error(`unable to confirm flight due to: ${e}`)
    }
  }

  return;
}

//helper
function confirmFlight(id) {
  return helpers.post(`flight/${id}/confirm`);
}

module.exports = { 
  processOrder
}
