import React from 'react';
import helpers from './helpers';

function renderProducts(inventory) {
  return helpers.generateOptionsTemplate(inventory);
}

function ProductSelector(props) {
  let { inventory, selectProduct } = props;

  return (
    <div className='Order_Form_Container'>
      <label
        className="Form_Label"
        htmlFor="select_product"
      >
        Product
      </label>

      <select id="select_product"
        className="Form_Input"
        required
        onChange={(e) => { selectProduct(e) }}
      >
        {renderProducts(inventory)}
      </select>
    </div>
  );
}

export default ProductSelector;