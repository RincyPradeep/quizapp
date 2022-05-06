import React,{useContext, useEffect} from 'react'
import {Link} from 'react-router-dom';

import './Header.css' 
import logo from "../../../assets/images/logo.png";

import AuthContext from '../../../context/AuthContext';
import StatisticsContext from "../../../context/StatisticsContext";


const Header = () => {

  let {user, logoutUser} = useContext(AuthContext)
  let {statistics,getStatistics} = useContext(StatisticsContext)

  useEffect(()=>{
    if(user)
    getStatistics(user.user_id)
  },[user])

  return (
    <section id="header" className='wrapper'>
      <div className="nav-left">
        <h1>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </h1>
      </div>
      <div className="nav-right">
        <ul>
          {user?
            <>
              <li>
                <h3>{user.username}</h3>
              </li>
              <li>
                <h3 className='total-price'>&#x20B9; {statistics.money_earned}</h3>
              </li>
              <li>
                <h3 className="logoutbtn" onClick={logoutUser}>Logout</h3>
              </li>
            </> :
              <li>
                <Link to="/login">Login</Link>
              </li>
          }
        </ul>
      </div>
    </section>
  )
}

export default Header