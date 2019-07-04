import React from 'react'

import OrderForm from './OrderForm.js'
import Notification from './Notification.js'
// import TrackingView from './TrackingView' //Will add in eventually

import helpers from './helpers'

export default class OrderTrackingApp extends React.Component {
  constructor(props) {
    super(props)

    //NOTE: idea is to eventually use projectedInventory to give customer "real-time" feedback on the
    //products/quantities they can select in a world where they can select multiple products + we want to 
    //minimize requests to the backend
    this.state = {
      //set on initial state
      hospitals: {},
      hospitalNames: [],
      currentInventory: {},
      //updated when hospital selected
      hospitalSelected: null,
      //updated based on product(s) selected
      availProducts: [], //NOTE: right now, this is only updated once, but eventually would be updated based on changes to cart
      checkoutCart: {},
      projectedInventory: {},
      //notification message
      notificationMessage: ""
    }

    this.selectedHospital = this.selectedHospital.bind(this);
    this.updatedCart = this.updatedCart.bind(this);
    this.submittedOrder = this.submittedOrder.bind(this);
    this.notficationClosed = this.notificationClosed.bind(this);
  }

  //ON MOUNT
  //grab hospital + inventory data from simulator + set on state
  componentDidMount() {
    this.refreshAppData();
  }

  //APP DATA HELPER FUNCTIONS
  async refreshAppData(){
    const hospitalData = await helpers.fetchAndGroup('hospitals');
    const currentInventoryData = await helpers.fetchAndGroup('inventory');
    const projectedInventoryData = {};

    for(let product in currentInventoryData) {
      projectedInventoryData[product] = currentInventoryData[product].quantity
    }

    this.setState({
      hospitals: hospitalData,
      currentInventory: currentInventoryData,
      projectedInventory: projectedInventoryData,
      checkoutCart: {}
    }, () => {
      console.log("current ACTUAL inventory: ", this.state.currentInventory)
      this.setAdditionalHospitalInfoOnState();
      this.determineAvailProducts();
    })
  }

  //HOSPITAL HELPER FUNCS
  //set hospital names/default selected hospital name on state
  setAdditionalHospitalInfoOnState() {
    const sortedHospitalNames = Object.keys(this.state.hospitals).sort();
    
    this.setState({ 
      hospitalNames: sortedHospitalNames,
      hospitalSelected: sortedHospitalNames[0]
    })
  }

  //update hospital name on state based on selection
  selectedHospital(hospital) {
    this.setState({
      hospitalSelected: hospital
    }, () => {
      console.log("updated hospital: ", this.state.hospitalSelected)
    })
  }

  //INVENTORY HELPER FUNCS
  //set sorted list of avail products on state
  determineAvailProducts() {
    //assuming that product is no longer selectable if already in cart (since there are no qty restrictions at the moment)
    const availProductList = Object.keys(this.state.projectedInventory)
      .filter((item) => {
        return !this.alreadyCheckedOut(item) && this.stillHave(item)
      })
      .sort();

    //if availProductList is empty, notify user
    if(availProductList.length === 0) {
      this.setState({
        notificationMessage: "The Zipline center is out of supplies. If this is an emergency, call us at 0788312345"
      })
    }
    
    //add default value of empty to product list 
    availProductList.unshift("")
    
    this.setState({ 
      availProducts: availProductList,
    })
  }

  alreadyCheckedOut(item) {
    return !this.state.checkoutCart[item] ? false : true
  }

  stillHave(item) {
    return this.state.projectedInventory[item] !== 0;
  }

  //ORDER HELPER FUNCS
  //update cart based on state based on user selections
  updatedCart(product = this.state.availProducts[0], quantity) {
    let updatedCart = {}

    updatedCart[product] = { 
      id: product ? this.state.currentInventory[product].id : "",
      units_requested: parseInt(quantity),
      mass_g: product ? this.state.currentInventory[product].mass_g : 0
    }

    this.setState({
      checkoutCart: updatedCart,
      newOrder: false
    }, () => {
      console.log("updated cart:", this.state.checkoutCart)
    })
  }
  
  //fires when user clicks "submit" button
  submittedOrder(e) {
    e.preventDefault();

    let hospitalInfo = Object.assign(
                        this.state.hospitals[this.state.hospitalSelected], 
                        {name: this.state.hospitalSelected }
                      )

    let orderData = JSON.stringify({
      hospital: hospitalInfo,
      cart: this.state.checkoutCart
    })

    this.sendOrder(orderData)
  }

  //sends order to backend and refreshes app data w/ latest inventory info
  async sendOrder(order) {
    try{
      await helpers.post(order, 'order')
    }
    catch(e) {
      this.setState({
        notificationMessage: "Unfortunately there was a problem with your order. Please contact us at 0788312345"
      })

      throw new Error(`unable to send order due to: ${e}`)
    }

    //confirm that order sent successfully
    this.setState({
      notificationMessage: "Your order was submitted successfully! You should receive your package(s) soon!"
    });
    
    //update app data with updated inventory
    this.refreshAppData();
    
    //manual override for now - okay to use jquery since child component state doesn't change on submit
    let form = document.body.getElementsByTagName('form')
    form[0].reset();

    return;
  }

  //RENDERING HELPER FUNCS
  //eventually will be used to toggle between orderform + trackingview components
  renderView() {
    return (
      <OrderForm 
        hospitals={this.state.hospitalNames} 
        availProductList={this.state.availProducts}
        remainingInventory={this.state.projectedInventory}
        selectHospital={this.selectedHospital}
        updatedCart={this.updatedCart}
        submitOrder={this.submittedOrder}
      /> 
    )
  }

  renderNotification() {
    if(!this.state.notificationMessage) {
      return ""
    } else {
      return (
        <Notification
          message={this.state.notificationMessage}
          closeNotification={this.notficationClosed}
        />
      )
    }
  }

  notificationClosed() {
    this.setState({
      notificationMessage: ""
    })
  }
  
  render() {
    return (
      <div className="App_Container">
        {this.renderNotification()}
        {this.renderView()}
      </div>
    )
  }
}