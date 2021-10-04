import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from '../firebase.config';
import {  FacebookAuthProvider } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {  updateProfile } from "firebase/auth";
import { useContext } from 'react';
import {userContext} from '../../App'
import { useHistory, useLocation } from 'react-router';
import './Login.css'

initializeApp(firebaseConfig);

const Login = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [loggedInUser,setLoggedInUser]=useContext(userContext)
  // sign in with google
  const [newUser,setNewUser]=useState(false)
  const [user,setUser]=useState({
    isSignedIn:false,
    name:'',
    email:'',
    photo:'',
    password:'',
    error:'',
    success:false,
  })

    const googleHandleClick=()=>{
      
        const gProvider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth,gProvider)
        .then((result) => {

          const {displayName,email,photoURL}= result.user;
          const signedInUser = {
            isSignedIn:true,
            name:displayName,
            email:email,
            photo:photoURL,
            error:''
          }
        setUser(signedInUser)
        setLoggedInUser(signedInUser)
        history.replace(from);
         
        }).catch((error) => {
          
          const errorMessage = error.message;
          const signedInUser = {
            isSignedIn:false,
            error:errorMessage
          }
         setUser(signedInUser)
      
        });
    }
  // sing in with facebook
const fbHandleClick = ()=>{
  const fbProvider = new FacebookAuthProvider();
   const auth = getAuth();
    signInWithPopup(auth, fbProvider)
   .then((result) => {

    const {displayName,email,photoURL}= result.user;
          const signedInUser = {
            isSignedIn:true,
            name:displayName,
            email:email,
            photo:photoURL,
            error:''
          }
        setUser(signedInUser)
        setLoggedInUser(signedInUser)
        history.replace(from);

    
  })
  .catch((error) => {
   
    const errorMessage = error.message;
    const signedInUser = {
      isSignedIn:false,
      error:errorMessage
    }
   setUser(signedInUser)

 
  })
}
//form handle on submit section
const handleSubmit = (e)=>{

  if(newUser && user.email && user.password && user.name){
  
    const auth = getAuth();
    // let displayName =user.name;
    createUserWithEmailAndPassword(auth, user.email, user.password,)
    .then((res) => {
   let  newUserInfo ={...user}
        newUserInfo.error='';
        newUserInfo.success=true;
        setUser(newUserInfo)
        updateUserName(user.name)
        setLoggedInUser(newUserInfo)
        history.replace(from);
  })
  .catch((error) => {
    let  newUserInfo ={...user}
    newUserInfo.error= error.message;;
    newUserInfo.success=false;
    setUser(newUserInfo)
  });
  }
  if(!newUser && user.email && user.password){
  
    const auth = getAuth();
  signInWithEmailAndPassword(auth, user.email, user.password)
  .then((res) => {
    const {displayName}=res.user;
    let  newUserInfo ={...user}
        newUserInfo.error='';
        newUserInfo.success=true;
        newUserInfo.name = displayName
        setUser(newUserInfo)
        setLoggedInUser(newUserInfo)
        history.replace(from);
        // console.log("signIn user info", res.user)
  })
  .catch((error) => {
    let  newUserInfo ={...user}
    newUserInfo.error= error.message;;
    newUserInfo.success=false;
    setUser(newUserInfo)
  });

  }
  e.preventDefault()
}

const onBlurHandle=(e)=>{
// console.log(e.target.name,e.target.value)
let isInputValid = true;
//email validation
if(e.target.name==="email"){
  isInputValid =  /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e.target.value)
}
if(e.target.value==="password"){
  isInputValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value)
}
if(isInputValid){
let newUser = {...user}
    newUser[e.target.name]=e.target.value;
    setUser(newUser)
}
}
// manage user from firebase which is use for upadate user info;
const updateUserName=(name)=>{
const auth = getAuth();
updateProfile(auth.currentUser, {
  displayName: name,  
}).then(() => {
  console.log("user name updated successfully")
}).catch((error) => {
  console.log(error)
});
}

    return (
        <div className= "main-div">
          <h1>User Name : {user.name}</h1>
          <h2>User Email : {user.email}</h2>
        <div className="login-sec">
            
           
             <p style={{color:"red"}}>{user.error}</p>
             {
               user.success && <p style={{color:"green"}}>user {newUser?"created":"login "} successfully</p>
             }
        </div>
          <button onClick = {googleHandleClick}>Continue with google</button>
          <button onClick = {fbHandleClick}>Continue with facebook</button> 
          <br/><br/> 
          <form onSubmit = {handleSubmit}>
          <h3>Login</h3>
                 {newUser && <div className="input-boxdiv">
                 <label htmlFor="name">name</label>
                   <input type="text" name="name" onBlur={onBlurHandle} placeholeder="Your name" required id="" /> <br/>
                   
               </div>
                 }
                 <div className="input-boxdiv">
                 <label htmlFor="email">email</label>
                     <input type="email" name="email" onBlur={onBlurHandle} placeholeder=" your email" required id="" /> <br/>
                     
                 </div>
                 <div className="input-boxdiv">
                    <label htmlFor="password">password</label>
                     <input type="password" name="password" onBlur={onBlurHandle} placeholeder="your password" required id="" /> <br/>
                     
                 </div>
                 <div className="check-box">
                 <label htmlFor="RememberMe" >Remember Me</label><br/>
                 <input type="checkbox"  name="RemebermeMe" id="" onClick={()=>setNewUser(!newUser)} value="RememberMe"/>
                 
                 </div>
                 <input type="submit" value={newUser?"SignUp":"LogIn"} />
             </form>
     </div>
    );
};

export default Login;