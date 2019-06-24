const express = require('express');
const router = express.Router();
const controller = require('../controllers')

router.get('/', async function (req, res) {
  const hospitals = await controller.getAllHospitals();
  res.status(200).send(hospitals)
})

module.exports = router;