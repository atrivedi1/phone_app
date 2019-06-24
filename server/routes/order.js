const express = require('express');
const router = express.Router();
const controller = require('../controllers')

//FOR TESTING CART W/ MULTIPLE PRODUCTS
// const sampleOrderPayload = {
//   hospital: { name: 'Gitwe', id: 6, flight_time_s: 699 },
  
//   cart: {
//     "CRYO A+": { id: 9, units_requested: 5, mass_g: 40 }, //200 grams
//     "RBC B+ Adult": { id: 2, units_requested: 5, mass_g: 700 }, //3500 grams
//     "RBC A+ Child": { id: 5, units_requested: 5, mass_g: 350 } // 1750 grams
//   }
// }

router.post('/', async function (req, res) {
  const order = req.body;
  const orderSummary = await controller.placeOrder(order)
  res.status(200).send(orderSummary)
})

//PLACEHOLDERS FOR FUTURE ROUTES
// router.get('/:orderId/:packageId', async function (req, res) {
//   res.status(200).send(`status of partciular package (based on zip assignment)`)
// })

// router.post('/cancel/:orderId/:packageId', async function (req, res) {
//   res.status(200).send(`canceled package and corresponding flight!`)
// })

module.exports = router;