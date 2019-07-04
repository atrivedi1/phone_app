import React from 'react';

//HTTP HELPERS
//fetches resource data
function fetchAll(resource) {
  return fetch(`/${resource}`)
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    return err;
  })
}

//fetch resource data (e.g. hospitals/inventory) and turn into object for easier lookup
async function fetchAndGroup(resource) {
  const resourceArray = await fetchAll(resource)
  const resourceMap = {}

  for (let element of resourceArray) {
    resource === "hospitals" ? groupHospital(element, resourceMap) : groupProduct(element, resourceMap)
  }

  return resourceMap;
}

function groupHospital(hospital, hospitalMap) {
  let currHospital = hospital.name;

  let currHospitalInfo = {
    id: hospital.id,
    flight_time_s: hospital.flight_time_s
  }

  hospitalMap[currHospital] = currHospitalInfo
}

function groupProduct(item, inventoryMap) {
  let currProduct = item.product;

  let currProductInfo = {
    id: item.id,
    mass_g: item.mass_g,
    quantity: item.quantity
  }

  inventoryMap[currProduct] = currProductInfo
}

//
function post(data, resource) {
  return fetch(`/${resource}`, {
    method: 'post',
    body: data,
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    })
}

//TEMPLATING HELPERS
//generate html template for hospitals/products/quantity option list
function generateOptionsTemplate(resource) {
  let html
  //for hospitals/products templating
  if (Array.isArray(resource)) {
    html = resource.map((op, i) => {
      return <option key={i} value={op}>{op}</option>
    })

    return html;
  }

  //for quantity templating
  else {
    //init avail options with default value of empty
    let availOptions = [""];

    for (let i = 1; i <= resource; i++) {
      availOptions.push(i);
    }

    html = availOptions.map((op, i) => {
      return <option key={i} value={op}>{op}</option>
    });

    return html;
  }
}

export default {
  fetchAndGroup,
  post,
  generateOptionsTemplate
}