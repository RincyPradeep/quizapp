import React, { useState,useEffect,useContext } from 'react'
import {useNavigate,useParams} from 'react-router-dom';

import axios from 'axios'
import sweetalert from 'sweetalert'
import Confetti from 'react-confetti' // party popper animation

import './Game.css'
import Questionaire from '../Questionaire/Questionaire';
import Score from '../Score/Score';
import Loader from '../Loader/Loader';

import AuthContext from '../../../context/AuthContext';
import StatisticsContext from "../../../context/StatisticsContext";
import GameContext from '../../../context/GameContext';


const Game = () => {

  let timer_one,timer_two,timer_three

  let {user,authTokens} = useContext(AuthContext)

  let {getStatistics} = useContext(StatisticsContext)

  let {questions,questionNumber,scores,setQuestions,setQuestionNumber,setScores,
      setCorrect,setShowAnswer,isTimeUp,questionsAnswered,correctAnswers,
      wrongAnswers,gamesPlayed,gamesWon,moneyEarned,setQuestionsAnswered,
      setMoneyEarned,setCorrectAnswers,setGamesPlayed,setWrongAnswers,
      setGamesWon,setWrong,wrong} = useContext(GameContext)


  const [loading,setLoading] = useState(true)
  const [showAnimation,setShowAnimation] = useState(false)
  
  const [leave,setLeave] = useState(false)
  const [finish,setFinish] = useState(false)

  const navigate = useNavigate();
  let { id } = useParams();

  const getQuestions = () =>{
    axios.get(`https://rincy.pythonanywhere.com/api/v1/quizzes/category/${id}/`).then((response)=>{ 
      let list = response.data.data
      if(list){
        list = list.sort(() => Math.random() - 0.5)  
        setQuestions(list)
      }
    }).catch(err=>{
      alert(err)
  })
  }

  const getScores = ()=>{
    axios.get('https://rincy.pythonanywhere.com/api/v1/quizzes/scores/').then((response)=>{
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
    axios.post(`https://rincy.pythonanywhere.com/api/v1/quizzes/change-statistics/${user.user_id}/`,{
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
          setShowAnimation(true)
          timer_two = setTimeout(()=>{
          setFinish(true)
          setGamesPlayed(1)
          setGamesWon(1)
          },5000)
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
        sweetalert({title: "You Won The Game.👏",
        text: `💰You earned Rs. ${getAnswerPrice()}`,
        })
        if(user){
          updateStatistics()
          getStatistics(user.user_id)
        }
        navigate("/")     
    }
    if(wrong){
      sweetalert({title: "You lost the game😭",
                  text: isTimeUp?"Time is up!⏰":"The Answer is wrong!"                 
                })
    
      if(user){
        updateStatistics()
        getStatistics(user.user_id)
      }
      navigate("/")
    }
    if(leave){
      sweetalert({title: "Good Decision👍",
      text: `You earned Rs. ${getAnswerPrice()}`,
      })
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
      setWrong(false);
      setQuestionNumber(1);
      setQuestionsAnswered(0);
      setCorrectAnswers(0)
      setWrongAnswers(0)
      setGamesWon(0)
    }
  },[])

  return (
    loading ? <Loader/>:
    (
      questions.length > scores.length?
      <section id="game" className='wrapper'> 
        {showAnimation && <Confetti/>} 

        <button className='leave-btn' onClick={leaveGame}>LEAVE</button>
        <div className='middle'>   
          <Score />
          <Questionaire getAnswerPrice={getAnswerPrice} checkAnswer={checkAnswer} />
        </div>
      </section>
      :<h3 style={{display:"flex",justifyContent:"center",alignItems:"center",height:"80vh"}}>Sorry...There is no enough questions to play!!!</h3>
    )    
  )
}

export default Game