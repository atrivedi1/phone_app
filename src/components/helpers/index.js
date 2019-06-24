import React from 'react';

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
  generateOptionsTemplate
}