import React from 'react'

import './Score.css'
import ScoreButton from '../ScoreButton/ScoreButton'

const Score = ({questionNumber,scores}) => {
  return (
    <section id="score" >
    {
      scores.map((obj)=>{
        let top
        if(obj.number === scores.length){
          top ="true"
        }
        return(
          <ScoreButton key={obj.id} number={obj.number} price={obj.score} questionNumber={questionNumber} top={top}/>
          )
      })
    }
    </section>
  )
}

export default Score