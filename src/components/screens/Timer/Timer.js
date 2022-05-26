import React,{useState,useEffect,useContext} from 'react'

import './Timer.css'

import GameContext from '../../../context/GameContext';


const Timer = () => {

    let {setIsTimeUp,setWrong,setGamesPlayed,setWrongAnswers,setQuestionsAnswered,
        setMoneyEarned} = useContext(GameContext)

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
                // setWrongAnswers(1)
                // setQuestionsAnswered((prev)=>prev+1)
                setMoneyEarned(0)
                clearInterval(interval)
            }else
            setCounter((prevCounter) => prevCounter - 1)
        }, 1000);
        
        return () =>{
             clearInterval(interval);
             setIsTimeUp(false)
        }
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