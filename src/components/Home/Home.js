import React from 'react';
import car from '../../images/Frame-1.png'
import bike from '../../images/Frame-2.png'
import bus from '../../images/Frame.png'
import train from '../../images/Group.png'
import Header from '../Header/Header'
import {NavLink} from 'react-router-dom'

const Home = () => {
    return (
        <div>
         <Header />
          <main  className="container">
            <NavLink to="/car">
                <div  className="car box">
                  <img src={bike} alt="car" />
                  <h3>CAR</h3>
                </div>
            </NavLink>
            <NavLink to="/bus">
              <div className="bus box">
                <img src={car} alt="bus" />
                <h3>BUS</h3>
             </div>
            </NavLink>

            <NavLink to="/bike">
              <div  className="bike box">
                <img src={bus} alt="bike" />
                <h3>BIKE</h3>
              </div>
            </NavLink>
          <NavLink to="/train">
             <div className="train box">
              <img src={train} alt="train" />
              <h3>Train</h3>
            </div>
          </NavLink>

        
      </main>
        </div>
    );
};

export default Home;