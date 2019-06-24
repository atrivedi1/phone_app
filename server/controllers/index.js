const hospitals = require('./hospital.js')
const inventory = require('./inventory.js')
const flight = require('./flight.js')

module.exports = {
  getAllHospitals: hospitals.getAll,
  getLatestInventory: inventory.getLatest,
  placeOrder: flight.processOrder
}