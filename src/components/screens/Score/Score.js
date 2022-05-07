import React,{useEffect} from 'react'

import './Score.css'
import ScoreButton from '../ScoreButton/ScoreButton'

const Score = ({setshowScoreBoard,questionNumber,scores}) => {

  useEffect(() => {
    const score_interval = setInterval(() => {
      setshowScoreBoard(false)
    }, 2000);
    return () => clearInterval(score_interval);
  }, []);

  return (
    <div className='overlay'>
    <section id="score" className='wrapper'>
    <div className='scores'>
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
    </div>
    </section>
    </div>
  )
}

export default Score