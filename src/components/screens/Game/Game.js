import React, { useState,useEffect,useContext } from 'react'
import {useNavigate} from 'react-router-dom';

import axios from 'axios'
import sweetalert from 'sweetalert'

import './Game.css'
import Questionaire from '../Questionaire/Questionaire';
import Score from '../Score/Score';
import Loader from '../Loader/Loader';

import AuthContext from '../../../context/AuthContext';
import StatisticsContext from "../../../context/StatisticsContext";


const Game = () => {

  let timer_one,timer_two,timer_three

  let {user,authTokens} = useContext(AuthContext)
  let {getStatistics} = useContext(StatisticsContext)

  const [loading,setLoading] = useState(true)
  const [istimeUp,setIsTimeUp] = useState(false)

  const [questions,setQuestions] = useState([])
  const [questionNumber,setQuestionNumber] = useState(1)
  const [scores,setScores] = useState([])
  
  const [leave,setLeave] = useState(false)
  const [finish,setFinish] = useState(false)
  const [wrong,setWrong] = useState(false)

  const [correct,setCorrect] = useState(false)
  const [showAnswer,setShowAnswer] = useState(false)

  const [questionsAnswered,setQuestionsAnswered] = useState(0)
  const [correctAnswers,setCorrectAnswers] = useState(0)
  const [wrongAnswers,setWrongAnswers] = useState(0)
  const [gamesPlayed,setGamesPlayed] = useState(0)
  const [gamesWon,setGamesWon] = useState(0)
  const [moneyEarned,setMoneyEarned] = useState(0)  

  const navigate = useNavigate();

  const getQuestions = () =>{
    axios.get('http://localhost:8000/api/v1/quizzes/').then((response)=>{ 
      let list = response.data
      list = list.sort(() => Math.random() - 0.5)  
      setQuestions(list)
    }).catch(err=>{
      alert(err)
  })
  }

  const getScores = ()=>{
    axios.get('http://localhost:8000/api/v1/quizzes/scores/').then((response)=>{
      setScores(response.data);     
    }).catch(err=>{
      alert(err)
  })
  }

  const getAnswerPrice = ()=>{
    var result = scores.find(obj => {
      return obj.number === questionNumber
    })
    if(result)
      return(result.score)
    else
      return(0)
  }

  const updateStatistics = () =>{
    axios.post(`http://localhost:8000/api/v1/quizzes/change-statistics/${user.user_id}/`,{
       "questions_answered" : questionsAnswered,"correct_answers" : correctAnswers, 
       "wrong_answers" : wrongAnswers,"games_played" : gamesPlayed,
       "games_won": gamesWon,"money_earned" : moneyEarned
            },{
            headers : {
                'Authorization':'Bearer ' + String(authTokens.access)
            },           
        }).then(response=>{
          console.log("STATISTICS UPDATED")
        }).catch(error=>{
          alert(error)
        })
  }

  const checkAnswer = (selected_option,answer,opt) =>{
    setQuestionsAnswered((prev)=>prev+1)
    if(selected_option === answer){
      setCorrect(true)
      timer_one = setTimeout(()=>{
        setMoneyEarned(getAnswerPrice())
        setCorrectAnswers((prev)=>prev+1)           
         
        if(questionNumber < scores.length){
          setQuestionNumber(questionNumber+1)
        }else{
          timer_two = setTimeout(()=>{
          setFinish(true)
          setGamesPlayed(1)
          setGamesWon(1)
          },2000)
        }
      },1000)
    }
      else{
        setShowAnswer(true)
        document.getElementById(opt).style.backgroundColor="rgb(181, 3, 3)"
        document.getElementById(opt).style.color="#fff"
        let element=document.getElementById(opt)
        element.getElementsByTagName("span")[0].style.color="#fff"
        timer_three = setTimeout(()=>{
          setWrong(true)
          setGamesPlayed(1)
          setWrongAnswers(1)
          setMoneyEarned(0)
        },2000)
      }    
  }  

  const leaveGame =() =>{
    setQuestionNumber((prev)=>prev-1)
    setLeave(true)
    setGamesPlayed(1)
  }

  useEffect(()=>{
    if(finish){
        sweetalert({title: "You won the game",
        text: `You earned Rs. ${getAnswerPrice()}`,
        icon: "success"})
        if(user){
          updateStatistics()
          getStatistics(user.user_id)
        }
        navigate("/")     
    }
    if(wrong){
      sweetalert({title: "You lost the game",
                  text: istimeUp?"Time is up!":"The Answer is wrong!",
                  icon: "error"})
    
      if(user){
        updateStatistics()
        getStatistics(user.user_id)
      }
      navigate("/")
    }
    if(leave){
      sweetalert({title: "Good Decision",
      text: `You earned Rs. ${getAnswerPrice()}`,
      icon: "success"})
      if(user){
        updateStatistics()
        getStatistics(user.user_id)
      }
      navigate("/")
    }
  },[finish,leave,wrong])

  useEffect(() => {
    getQuestions()
    getScores() 
    setLoading(false)    
    
    return () => {
      clearTimeout(timer_one);
      clearTimeout(timer_two);
      clearTimeout(timer_three);
    }
  },[])

  return (
    loading ? <Loader/>:
    (
      questions.length > scores.length?
      <section id="game" className='wrapper'>        
        <button className='leave-btn' onClick={leaveGame}>LEAVE</button>
        <div className='middle'>       
          <Score questionNumber={questionNumber} scores={scores}/>
          <Questionaire questions={questions} setQuestions={setQuestions} questionNumber={questionNumber} 
                        getAnswerPrice={getAnswerPrice} checkAnswer={checkAnswer} 
                        correct={correct} setCorrect={setCorrect}
                        showAnswer={showAnswer} setShowAnswer={setShowAnswer} setWrong={setWrong} setIsTimeUp={setIsTimeUp}
                        setGamesPlayed={setGamesPlayed} setWrongAnswers={setWrongAnswers} setQuestionsAnswered={setQuestionsAnswered} setMoneyEarned={setMoneyEarned}/>
        </div>
      </section>
      :<h3 style={{textAlign:"center"}}>Sorry...There is no enough questions to play!!!</h3>
    )    
  )
}

export default Game