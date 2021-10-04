import React from 'react';
import { useContext } from 'react';
import {userContext} from '../../App'

import logo from '../../images/logoRide.png'
import './Header.css'
const Header = () => {
  const [loggedInUser,setLoggedInUser]=useContext(userContext)
    return (
        <header className="App-header">
            <img class="logo-img" src={logo} alt="logo" srcset="" />
        <nav>
          <ul>
            <li><a href="home">home</a></li>
            <li><a href="destination">Destination</a></li>
            <li><a href="blog">Blog</a></li>
            <li><a href="contact">Contact</a></li>
         
            {
              loggedInUser && <li>{loggedInUser.name?<a>{loggedInUser.name}</a>:<a class="login-btn" href="login">Login</a>}</li>  
            }
          </ul>
         
        </nav>
        
      </header>
    );
};

export default Header;