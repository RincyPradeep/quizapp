import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom';

import axios from 'axios'
import sweetalert from 'sweetalert'

import './Game.css'
import Score from '../Score/Score';


const Game = () => {
  let question

  const [questions,setQuestions] = useState([])
  const [questionNumber,setQuestionNumber] = useState(1)
  const [showScoreBoard,setshowScoreBoard] = useState(false)

  const navigate = useNavigate();

  const getQuestions = () =>{
    axios.get('http://localhost:8000/api/v1/quizzes/').then((response)=>{
      console.log("RESPONSE:",response.data)
      setQuestions(response.data);      
    }).catch(err=>{
      alert(err)
  })
  }

  const getAnswerPrice = ()=>{
    let price;
    switch (questionNumber){
      case 1: price = 500;
              break;
      case 2: price = 1000;
              break;
      case 3: price = 2000;
              break;
      case 4: price = 3000;
              break;
      case 5: price = 5000;
              break;
      case 6: price = 7500;
              break;
      case 7: price = 10000;
              break;
      case 8: price = 12500;
              break;
      case 9: price = 15000;
              break;
      case 10: price = 25000;
              break;
      case 11: price = 50000;
              break;
      case 12: price = 100000;
              break;
      case 13: price = 250000;
              break;
      case 14: price = 500000;
              break;
      case 15: price = 1000000;
              break;
      default : price = 0;
    }
    return (price)
  }

  const getSingleQuestion = () =>{
    question =  questions[Math.floor(Math.random()*questions.length)];
    
    if (question){
      return(
        <div className='question'>
          <h2 id="price">&#x20B9; {getAnswerPrice()}</h2>
          <h3>{questionNumber}. {question.question}</h3>
          <div className='answers'>
            <button onClick={()=>checkAnswer(question.option_one)} id="opt1" >A. {question.option_one}</button>
            <button onClick={()=>checkAnswer(question.option_two)} id="opt2" >B. {question.option_two}</button>
            <button onClick={()=>checkAnswer(question.option_three)} id="opt3" >C. {question.option_three}</button>
            <button onClick={()=>checkAnswer(question.option_four)} id="opt4" >D. {question.option_four}</button>
          </div>
        </div> 
      )
    }
  }

  const checkAnswer =(selected_option) =>{
    if(selected_option === question.answer){
      setshowScoreBoard(true)     
      setQuestionNumber(questionNumber+1)
      
      if(questionNumber >= 5){
      sweetalert({title: "You won the game",
                text: `You earned Rs. ${getAnswerPrice()}`,
                icon: "success"})
      navigate("/")
      }
    }
    else{
      sweetalert({title: "You lost the game",
                  text: "The Answer is wrong!",
                  icon: "error"})
      navigate("/")
    }
  }

  useEffect(() => {
    getQuestions() 
  },[])

  return (
    <section id="game" className='wrapper'>
      <div className='top'>
        Timer...
      </div>
      <button className='leave-btn' onClick={()=> navigate("/")}>LEAVE</button>
      {getSingleQuestion()}   
      {showScoreBoard && <Score setshowScoreBoard={setshowScoreBoard} questionNumber={questionNumber} />}
      <div className='bottom'>
        <button>50 : 50</button>
        <button><i className="fa-solid fa-arrows-rotate"></i></button>
        <button><i className="fa-solid fa-lightbulb"></i></button>
      </div>
    </section>
  )
}

export default Game