const express = require('express');
const router = express.Router();
const controller = require('../controllers')

router.get('/', async function (req, res) {
  const inventory = await controller.getLatestInventory();
  res.status(200).send(inventory)
})

module.exports = router;