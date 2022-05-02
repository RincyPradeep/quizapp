import React from 'react'
import {Link} from 'react-router-dom';

import './Statistics.css'


const Statistics = () => {
  return (
    <section id="statistics" className='wrapper'>        
      <Link to="/"><i className="fa-solid fa-circle-xmark close-btn"></i></Link>
      <div className='content'>
        <h1>STATISTICS</h1>
        <div>
        <div className='topics'>
          <h3><i className="fa-solid fa-question"></i> Questions answered</h3>
          <h3>4</h3>
        </div>
        <div className='topics'>
          <h3><i className="fa-solid fa-check"></i> Correct answers</h3>
          <h3>4</h3>
        </div>
        <div className='topics'>
          <h3><i className="fa-solid fa-xmark"></i> Wrong answers</h3>
          <h3>4</h3>
        </div>
        <div className='topics'>
          <h3><i className="fa-solid fa-chart-pie"></i> Correct percentage</h3>
          <h3>4%</h3>
        </div>
        <div className='topics'>
          <h3><i className="fa-solid fa-gamepad"></i> Games played</h3>
          <h3>4</h3>
        </div>
        <div className='topics'>
          <h3><i className="fa-solid fa-crown"></i> Games won</h3>
          <h3>4</h3>
        </div>
        <div className='topics'>
          <h3><i className="fa-solid fa-medal"></i> Win rate</h3>
          <h3>4</h3>
        </div>
        <div className='topics'>
          <h3><i className="fa-solid fa-sack-dollar"></i> Money earned</h3>
          <h3>4</h3>
        </div>
        </div>
      </div>
    </section>
  )
}

export default Statistics