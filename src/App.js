import React,{useState,createContext} from 'react';
import './App.css';
//  import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login'
import Bike from './components/Bike/Bike';
import Car from './components/Car/Car';
import Bus from './components/Bus/Bus';
import Train from './components/Train/Train';
import NotFound from './components/NotFound/NotFound'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";


export const userContext = createContext()

function App() {

  const [loggedInUser,SetLoggedInUser]=useState({})
  return (
<userContext.Provider value = {[loggedInUser,SetLoggedInUser]}>
<div className="App">
 
<Router>
  
  <Switch>
    <Route path="/Home">
      <Home />
    </Route>

    <Route exact path="/">
      <Home />
    </Route>
    <PrivateRoute  path="/car">
        <Car />
    </PrivateRoute>

    <PrivateRoute  path="/bus">
        <Bus />
    </PrivateRoute>

    <PrivateRoute  path="/bike">
        <Bike />
    </PrivateRoute>

    <PrivateRoute  path="/train">
        <Train />
    </PrivateRoute>
    
    <Route  path="/login">
      <Login />
    </Route>
    <Route  path="*">
      <NotFound/>
    </Route>
  </Switch>

</Router>

</div>
</userContext.Provider>

  );
}

export default App;
