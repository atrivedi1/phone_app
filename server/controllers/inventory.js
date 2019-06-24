const helpers = require('./helpers')

async function getLatest() {
  let inventory

  try {
    inventory = await helpers.fetchAll('inventory');
  }
  catch (e) {
    throw new Error(`unable to fetch inventory due to: ${e}`)
  }

  return inventory;
}

module.exports = { getLatest }