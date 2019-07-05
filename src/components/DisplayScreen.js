import React from 'react';

//MVP
function renderPermutations(digitsPressedSoFar, digitsToLetters) {
  let results = [];
  let filteredDigits = digitsPressedSoFar.filter((digit) => {
    return digit !== 0 && digit !== 1;
  })

  let set = new Set();

  function helper(build, index) {
    if(build.length === filteredDigits.length) {
      console.log("build -->", build)
      
      if(!set.has(build)) {
        set.add(build);
        results.push(build);
      }

      return;
    }

    for(let i = index; i < filteredDigits.length; i++) {
      let currNum = filteredDigits[i];
      let currNumLetters = digitsToLetters[currNum];

      for(let letter of currNumLetters) {
        console.log("letter -->", letter);
        let newBuild = build + letter;
        console.log("newBuild -->", newBuild)
        helper(newBuild, index + 1)
      }
    }
  }

  helper("", 0)

  console.log("RESULTS -->", results);
  return results;
}

function DisplayScreen(props) { 
  let { digitsPressedSoFar, digitsToLetters } = props;

  return (
    <div className='Display_Screen'>
      {renderPermutations(digitsPressedSoFar, digitsToLetters)}   
    </div>
  );
}

export default DisplayScreen;