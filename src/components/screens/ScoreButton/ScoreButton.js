import React,{useContext} from 'react'

import './ScoreButton.css'

import GameContext from '../../../context/GameContext';


const ScoreButton = ({number,price,top}) => {

  let {questionNumber} = useContext(GameContext)

  return (
    <button className={top? "top" :"" || parseInt(number)===questionNumber-1? "active" :""}>
        <span>{number}</span>
        <span>{price}</span>
    </button>
  )
}

export default ScoreButton