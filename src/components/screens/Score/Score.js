import React,{useContext} from 'react'

import './Score.css'
import ScoreButton from '../ScoreButton/ScoreButton'

import GameContext from '../../../context/GameContext';


const Score = () => {

  let {scores} = useContext(GameContext)

  return (
    <section id="score" >
    {
      scores.map((obj)=>{
        let top
        if(obj.number === scores.length){
          top ="true"
        }
        return(
          <ScoreButton key={obj.id} number={obj.number} price={obj.score} top={top}/>
          )
      })
    }
    </section>
  )
}

export default Score