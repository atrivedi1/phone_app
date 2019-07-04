import React from 'react';
import ProductSelector from './ProductSelector.js'
import QuantitySelector from './QuantitySelector.js'

export default class ProductQuantitySelectionModule extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      productSelected: this.props.availProducts[0],
      quantitySelected: 1
    }

    this.selectProduct = this.selectProduct.bind(this);
    this.selectQuantity = this.selectQuantity.bind(this);
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
          <ProductSelector 
            selectProduct={this.selectProduct}
            inventory={this.props.availProducts}
          />
          
          <QuantitySelector 
            selectQuantity={this.selectQuantity}
            remainingInventory={this.props.remainingInventory}
            productSelected={this.state.productSelected}
            quantitySelected={this.state.quantitySelected}
          />
          {/* <button>Remove</button> //for multiple product use-case */}
      </div>
    );
  }
}