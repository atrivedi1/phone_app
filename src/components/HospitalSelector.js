import React from 'react';
import helpers from './helpers';

function renderHospitals(hospitals) {
  return helpers.generateOptionsTemplate(hospitals);
} 

function HospitalSelector(props) {
  let { hospitals, selectHospital } = props;

  return (
    <div className='Order_Form_Container'>
      <label
        className="Form_Label"
        htmlFor="select_hospital"
      >
        Hospital
      </label>

      <select id="select_hospital"
        className="Form_Input"
        required
        onChange={(e) => { selectHospital(e.target.value) }}
      >
        {renderHospitals(hospitals)}
      </select>
    </div>
  );
}

export default HospitalSelector;