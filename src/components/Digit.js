import React from 'react';

function Digit(props) {

  return (
    <div className='Digit' id={props.id}>
      <button onClick={() => {props.pressDigit(props.value)}}>{props.value}</button>
    </div>
  );
}

export default Digit;