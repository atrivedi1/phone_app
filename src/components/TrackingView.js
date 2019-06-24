//PLACEHOLDER

import React from 'react';
import '../App.css'
import Order from './Order.js'

//example
function renderIndivOrders(props) {
  return (
    <Order />
  )
}

function TrackingView(props) {
  return (
    <div className=''>
      Tracking View
      {renderIndivOrders()}
    </div>
  );
}

export default TrackingView;