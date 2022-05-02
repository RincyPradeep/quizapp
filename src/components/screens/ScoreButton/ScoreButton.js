import React from 'react'

import './ScoreButton.css'

const ScoreButton = ({number,price,top,questionNumber}) => {
  return (
    <button className={top? "top" :"" || parseInt(number)===questionNumber-1? "active" :""}>
        <span>{number}</span>
        <span>{price}</span>
    </button>
  )
}

export default ScoreButton