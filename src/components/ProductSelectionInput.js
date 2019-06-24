import React from 'react';
import helpers from './helpers';

export default class ProductSelectionInput extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      productSelected: this.props.availProducts[0],
      quantitySelected: 1
    }

    this.selectProduct = this.selectProduct.bind(this);
    this.selectQuantity = this.selectQuantity.bind(this);
  }

  renderProducts(inventory) {
    return helpers.generateOptionsTemplate(inventory);
  }

  renderQuantities(remainingInventory, product = this.props.availProducts[0]) {
    const quantity = remainingInventory[product];
    return helpers.generateOptionsTemplate(quantity);
  }

  selectProduct(e) {
    this.setState({
      productSelected: e.target.value
    }, () => {
      this.props.updateCart(this.state.productSelected, this.state.quantitySelected)
    })
  }

  selectQuantity(e) {
    this.setState({
      quantitySelected: e.target.value
    }, () => {
      this.props.updateCart(this.state.productSelected, this.state.quantitySelected)
    })
  }

  render() { 
    return (
      <div className=''>
          <label 
            className="Form_Label"
            htmlFor="select_product"
          >
            Product 
          </label>

          <select id="select_product" 
            className="Form_Input"
            required
            onChange={(e) => {this.selectProduct(e)}}
          >
            {this.renderProducts(this.props.availProducts)}
          </select>

          <label 
            className="Form_Label"
            htmlFor="select_quantity"
          >
            Quantity 
          </label>

          <select id="select_quantity" 
            className="Form_Input"
            required
            defaultValue={this.state.quantitySelected}
            onChange={(e) => {this.selectQuantity(e)}}
          >
            {this.renderQuantities(this.props.remainingInventory, this.state.productSelected)}
          </select>

          {/* <button>Remove</button> //for multiple product use-case */}
      </div>
    );
  }
}