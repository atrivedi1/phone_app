import React from 'react';
import helpers from './helpers';

function renderQuantities(remainingInventory, product) {
  const quantity = remainingInventory[product];
  return helpers.generateOptionsTemplate(quantity);
}

function QuantitySelector(props) {
  let { remainingInventory, productSelected, selectQuantity, quantitySelected } = props;

  return (
    <div className='Order_Form_Container'>
      <label
        className="Form_Label"
        htmlFor="select_quantity"
      >
        Quantity
      </label>

      <select id="select_quantity"
        className="Form_Input"
        required
        defaultValue={quantitySelected}
        onChange={(e) => { selectQuantity(e) }}
      >
        {renderQuantities(remainingInventory, productSelected)}
      </select>
    </div>
  );
}

export default QuantitySelector;