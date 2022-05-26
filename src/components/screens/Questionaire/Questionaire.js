import React,{useState,useContext} from 'react'

import { Zoom } from "react-awesome-reveal";

import './Questionaire.css'
import GameOptions from '../GameOptions/GameOptions';
import Timer from '../Timer/Timer';

import GameContext from '../../../context/GameContext';


const Questionaire = ({getAnswerPrice, checkAnswer}) => {

  let {questions,questionNumber,correct,showAnswer} = useContext(GameContext)
 
  const [showSkipButton,setShowSkipButton] = useState(true)
  const [showAnswerButton,setShowAnswerButton] = useState(true)
  const [showFiftyButton,setShowFiftyButton] = useState(true)


  return (
    <section id='questionaire'>
        {questions.map((question,index)=>{          
        if(index===questionNumber-1)
        return(
          <div className='question' key={question.id}>
          <Timer />
          <h2 id="price">&#x20B9; {getAnswerPrice()}</h2>
          <Zoom>
            <h3>{questionNumber}. {question.question}</h3>
            <div className='answers'>
              <button onClick={(e)=>checkAnswer(e.target.value,question.answer,"opt1")} 
                                id="opt1" className={((correct ||showAnswer) && question.option_one===question.answer) ? "bg-green":"" } 
                                value={question.option_one}><span>(A)</span>{question.option_one}</button>
              <button onClick={(e)=>checkAnswer(e.target.value,question.answer,"opt2")} 
                                id="opt2" className={((correct ||showAnswer) && question.option_two===question.answer)? "bg-green":""} 
                                value={question.option_two}><span>(B)</span>{question.option_two}</button>
              <button onClick={(e)=>checkAnswer(e.target.value,question.answer,"opt3")} 
                                id="opt3" className={((correct ||showAnswer) && question.option_three===question.answer)? "bg-green":""} 
                                value={question.option_three}><span>(C)</span>{question.option_three}</button>
              <button onClick={(e)=>checkAnswer(e.target.value,question.answer,"opt4")} 
                                id="opt4" className={((correct ||showAnswer) && question.option_four===question.answer)? "bg-green":""} 
                                value={question.option_four}><span>(D)</span>{question.option_four}</button>

            </div>
          </Zoom>
          <GameOptions questionId={question.id} showSkipButton={showSkipButton} 
                       setShowSkipButton={setShowSkipButton} showAnswerButton={showAnswerButton} 
                       setShowAnswerButton={setShowAnswerButton} 
                       question={question} showFiftyButton={showFiftyButton} 
                       setShowFiftyButton={setShowFiftyButton} checkAnswer={checkAnswer}/>
        </div>   
        )
        else{
          return null
        }
      })}      
    </section>
  )
}

export default Questionaire