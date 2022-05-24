import React,{useContext} from 'react'
import {Link} from 'react-router-dom';

import { Zoom } from "react-awesome-reveal";

import './Home.css'
import home_image from "../../../assets/images/home_image.png";

import AuthContext from '../../../context/AuthContext';


const Home = () => {
  let {user} = useContext(AuthContext)
  
  return (
    <section id="home" className='wrapper'>
      <Zoom>
        <img src={home_image} alt="home" />
      </Zoom>
      <Link to="/category" className='play'>PLAY</Link>
      {user &&
        <Link to={`/statistics/${user.user_id}`} className='statistics'><i className="fa-solid fa-chart-simple"></i></Link>
      }
    </section>
  )
}

export default Home