import React,{useEffect} from 'react'

import './GameOptions.css' 


const GameOptions = ({questions,setQuestions,questionId,showSkipButton,setShowSkipButton,
                      showAnswerButton,setShowAnswer,setShowAnswerButton,setCorrect,
                      question,showFiftyButton,setShowFiftyButton,checkAnswer}) => {

  const fiftyFifty =()=>{
    let incorrect_answers=[];
    if(question.answer!==question.option_one){
      incorrect_answers.push("opt1")
    }
    if(question.answer!==question.option_two){
      incorrect_answers.push("opt2")
    }
    if(question.answer!==question.option_three){
      incorrect_answers.push("opt3")
    }
    if(question.answer!==question.option_four){
      incorrect_answers.push("opt4")
    }
    
    let wrong_answers_id = incorrect_answers.sort(() => Math.random() - 0.5)  
    
    document.getElementById(wrong_answers_id[0]).style.visibility="hidden"
    document.getElementById(wrong_answers_id[1]).style.visibility="hidden"

    setShowFiftyButton(false)
  }

  const skipQuestion =()=>{
    let newarray=questions.filter((item)=>item.id!==questionId)
    setQuestions(newarray)
    setShowSkipButton(false)
  }

  const showCorrectAnswer =()=>{
    setShowAnswer(true)
    setShowAnswerButton(false)
    checkAnswer(question.answer,question.answer)
  }

  useEffect(()=>{
    setShowAnswer(false)
    setCorrect(false)
  },[])

  return (
    <div className='game-options'>
        {showFiftyButton && <button onClick={fiftyFifty}>50 : 50</button>}
        {showSkipButton && <button onClick={skipQuestion}><i className="fa-solid fa-arrows-rotate"></i></button>}
        {showAnswerButton && <button onClick={showCorrectAnswer}><i className="fa-solid fa-lightbulb"></i></button>}
      </div>
  )
}

export default GameOptions