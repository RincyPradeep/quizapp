import React,{useState,useEffect} from 'react'

import './Timer.css'

const Timer = ({setIsTimeUp,setWrong,setGamesPlayed,setWrongAnswers,setQuestionsAnswered,setMoneyEarned}) => {

    const [counter,setCounter] = useState(60)
    const [alert,setAlert] = useState(false)

    useEffect(()=>{
        const interval = setInterval(() => {
            if(counter <= 10){
                setAlert(true)
            }
            if(counter === 0){
                setIsTimeUp(true)
                setWrong(true)
                setGamesPlayed(1)
                setWrongAnswers(1)
                setQuestionsAnswered((prev)=>prev+1)
                setMoneyEarned(0)
                clearInterval(interval)
            }else
            setCounter((prevCounter) => prevCounter - 1)
        }, 1000);
        
        return () => clearInterval(interval);
    },[counter])

  return (
    <section id='timer-container'>
        <div className={alert ? 'red timer' : 'timer'}>
            {counter}
        </div>
    </section>
  )
}

export default Timer