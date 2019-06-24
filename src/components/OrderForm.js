import React from 'react';
import helpers from './helpers';
import ProductSelectionInput from './ProductSelectionInput'

function renderHospitals(hospitals) {
  return helpers.generateOptionsTemplate(hospitals);
} 

// PLACEHOLER/TEMPLATE FOR MULTIPLE PRODUCT USE CASE
// function renderProductSelectionInputs(selectionInputData) {
//   console.log("rendering product selection inputs");
//   return selectionInputData.map((inputData) => {
//     return (
//       <ProductSelectionInput />
//     )
//   })
// }

function OrderForm(props) {
  let { hospitals, 
        availProductList,
        remainingInventory, 
        selectHospital,
        updatedCart, 
        submitOrder } = props;

  return (
    <div className='Order_Form_Container'>
    
      {/* <button}>Add to order</button> //for mult prod use case */}

      <form 
        className="Form" 
        onSubmit={(e) => {submitOrder(e)}}
      >
        <h3 className="Form_header">PLACE ORDER</h3>
        <label 
          className="Form_Label" 
          htmlFor="select_hospital"
        >
          Hospital 
        </label>
        
        <select id="select_hospital" 
          className="Form_Input"
          required 
          onChange={(e) => {selectHospital(e.target.value)}}
        >
          {renderHospitals(hospitals)}
        </select>

        <ProductSelectionInput 
          availProducts={availProductList}
          remainingInventory={remainingInventory}
          updateCart={updatedCart}
        />

        <input 
          className="Submit_Button"
          value=""
          type="submit" 
        >  
        </input>
      </form>
    </div>
  );
}

export default OrderForm;