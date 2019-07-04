import React from 'react';
import ProductQuantitySelectionModule from './ProductQuantitySelectionModule'
import HospitalSelector from './HospitalSelector';

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
        
        <HospitalSelector 
          hospitals={hospitals}
          selectHospital={selectHospital}
        />

        <ProductQuantitySelectionModule
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