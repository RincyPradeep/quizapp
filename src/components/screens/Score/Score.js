import React,{useEffect} from 'react'

import './Score.css'
import ScoreButton from '../ScoreButton/ScoreButton'

const Score = ({setshowScoreBoard,questionNumber}) => {

  useEffect(() => {
    const interval = setInterval(() => {
      setshowScoreBoard(false)
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='overlay'>
    <section id="score" className='wrapper'>
      <div className='scores'>
        <ScoreButton number="15" price="10,00000" top="true"/>
        <ScoreButton number="14" price="5,00,000" questionNumber={questionNumber} />
        <ScoreButton number="13" price="2,50,000" questionNumber={questionNumber} />
        <ScoreButton number="12" price="1,00,000" questionNumber={questionNumber} />
        <ScoreButton number="11" price="50,000" questionNumber={questionNumber} />
        <ScoreButton number="10" price="25,000" questionNumber={questionNumber} />
        <ScoreButton number="9" price="15,000" questionNumber={questionNumber} />
        <ScoreButton number="8" price="12,500" questionNumber={questionNumber} />
        <ScoreButton number="7" price="10,000" questionNumber={questionNumber} />
        <ScoreButton number="6" price="7,500" questionNumber={questionNumber} />
        <ScoreButton number="5" price="5,000" questionNumber={questionNumber} />
        <ScoreButton number="4" price="3,000" questionNumber={questionNumber} />
        <ScoreButton number="3" price="2,000" questionNumber={questionNumber} />
        <ScoreButton number="2" price="1,000" questionNumber={questionNumber} />
        <ScoreButton number="1" price="500" questionNumber={questionNumber} />
      </div>
      <div className='bottom-buttons'>
        
        <button className='continue-btn' onClick={()=>setshowScoreBoard(false)}>CONTINUE</button>
      </div>
    </section>
    </div>
  )
}

export default Score