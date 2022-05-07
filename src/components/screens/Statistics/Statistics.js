import React,{useContext, useEffect} from 'react'
import {Link} from 'react-router-dom';

import './Statistics.css'

import AuthContext from '../../../context/AuthContext';
import StatisticsContext from "../../../context/StatisticsContext";


const Statistics = () => {
  let {user} = useContext(AuthContext)
  let {getStatistics,statistics} = useContext(StatisticsContext)

  useEffect(()=>{
    if(user){
      getStatistics(user.user_id)
    }
  },[])

  return (
    <section id="statistics" className='wrapper'>        
      <div className='content'>
      <Link to="/"><i className="fa-solid fa-circle-xmark close-btn"></i></Link>

        <h1>STATISTICS</h1>
        <div>
        <div className='topics'>
          <h3><i className="fa-solid fa-question"></i>Questions answered</h3>
          <h3>{statistics.questions_answered}</h3>
        </div>
        <div className='topics'>
          <h3><i className="fa-solid fa-check"></i> Correct answers</h3>
          <h3>{statistics.correct_answers}</h3>
        </div>
        <div className='topics'>
          <h3><i className="fa-solid fa-xmark"></i> Wrong answers</h3>
          <h3>{statistics.wrong_answers}</h3>
        </div>
        <div className='topics'>
          <h3><i className="fa-solid fa-chart-pie"></i> Correct percentage</h3>
          <h3>{statistics.correct_percentage}%</h3>
        </div>
        <div className='topics'>
          <h3><i className="fa-solid fa-gamepad"></i> Games played</h3>
          <h3>{statistics.games_played}</h3>
        </div>
        <div className='topics'>
          <h3><i className="fa-solid fa-crown"></i> Games won</h3>
          <h3>{statistics.games_won}</h3>
        </div>
        <div className='topics'>
          <h3><i className="fa-solid fa-medal"></i> Win rate</h3>
          <h3>{statistics.win_rate}%</h3>
        </div>
        <div className='topics'>
          <h3><i className="fa-solid fa-sack-dollar"></i> Money earned</h3>
          <h3>{statistics.money_earned}</h3>
        </div>
        </div>
      </div>
    </section>
  )
}

export default Statistics