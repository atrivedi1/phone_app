const helpers = require('./helpers')

async function getAll() {
  let hospitals 
  
  try {
    hospitals = await helpers.fetchAll('hospitals');
  }
  catch (e) {
    throw new Error(`unable to fetch hospitals due to: ${e}`)
  }

  return hospitals;
}

module.exports = { getAll }