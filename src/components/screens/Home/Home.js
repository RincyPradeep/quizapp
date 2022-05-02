import React from 'react'
import {Link} from 'react-router-dom';

import './Home.css'
import home_image from "../../../assets/images/home_image.png";


const Home = () => {
  return (
    <section id="home" className='wrapper'>
      <img src={home_image} alt="home" />
      <Link to="/game" className='play'>PLAY</Link>
      <Link to="/statistics" className='statistics'><i className="fa-solid fa-chart-simple"></i></Link>
    </section>
  )
}

export default Home