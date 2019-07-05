import React from 'react'
import DisplayScreen from './DisplayScreen.js'
import Digit from './Digit.js'
import ClearButton from './ClearButton.js'

export default class PhoneApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      digitsPressedSoFar: [],
      digitRows: [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [0]
      ],
      digitToLettersMap: {
        1: "",
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz"
      },
      lettersToRender: [] //unclear whether or not this should be in displayScreen?
    }

    this.digitPressed = this.digitPressed.bind(this);
  }

//             <Digit
//   value={digit}
//   key={index}
//   pressDigit={this.digitPressed}
// />
  //Digit Helper Functions
  renderDigits() {
    let digitJSX = [];

    for(let i = 0; i < this.state.digitRows.length; i++) {
      let row = this.state.digitRows[i];
      let newRowJSX = this.buildDigitRowJSX(row, i);
      digitJSX.push(newRowJSX);
    }
    
    return(
      <div className="Dial_Pad">
        {digitJSX}
      </div>
    )
  }  

  buildDigitRowJSX(row, index) {
    let digitRowJSX = row.map((digit) => {
      return (
        <Digit
          value={digit}
          key={digit}
          pressDigit={this.digitPressed}
        />
      )
    })

    return (
      <div className="Digit_Row" key={index}>
        {digitRowJSX}
      </div>
    )
  }
  
  digitPressed(digit) {
    let updatedDigitsPressed = [...this.state.digitsPressedSoFar.slice(0), digit]
    this.setState({
      digitsPressedSoFar: updatedDigitsPressed
    }, () => {
      console.log("new digit pressed", this.state.digitsPressedSoFar);
    })
  }

  render() {
    return (
      <div className="Phone_App">
        <h3>Phone App</h3>
        
        <DisplayScreen 
          digitsPressedSoFar={this.state.digitsPressedSoFar}
          digitsToLetters={this.state.digitToLettersMap}
        />

        {this.renderDigits()}        

        <ClearButton />
      </div>
    )
  }
}