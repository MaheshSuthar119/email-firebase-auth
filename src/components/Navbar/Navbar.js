import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import style from'./Nav.module.css'
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../Firebase'
import { toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate ();
  // const notify = (message) => toast.success(message);
  
  const [action, setAction] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth)

  const handleSubmit = async(e) => {
    e.preventDefault();
    let toastMessage = ''; // Initialize the toast message variable
     
    // for sign up auth
    if(action === 'Sign Up'){
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        toastMessage = "Welcome"; // Success message for sign-up
        navigate('/Home'); // Navigate to the dashboard after sign-up
      } catch (error) {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          toastMessage = "User already exists"; // Error message for existing user during sign-up
        }
      }
    }
    //  for sign in auth
    else if (action === 'Sign In') {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        toastMessage = "Welcome"; // Success message for sign-in
        navigate('/Home'); // Navigate to the dashboard after sign-in
      } catch (error) {
        console.log(error);
        if (error.code === "auth/user-not-found") {
          toastMessage = "User does not exist"; // Error message for non-existing user during sign-in
        }
      }
      } 

      if (toastMessage !== "") {
        toast.dismiss(); // Dismiss any existing toast before showing a new one
        toast.success(toastMessage); // Show the toast message
        // notify(toastMessage);
      }

      
  };

 // Function to handle invalid form submission
 const handleInvalidForm = (e) => {
  const form = e.target;
  const inputs = form.querySelectorAll('input[required]');
  inputs.forEach(input => {
    if (!input.validity.valid) {
      input.setCustomValidity('Please provide this information');
    }
  });
};


  return (
    <div >
    <form onInvalid={handleInvalidForm} onSubmit={handleSubmit}> 
      <div className={style.nav} >
        <h2 className={`style.In ${action === 'Sign In' ? 'selected' : ''}`} 
        onClick = {() => setAction('Sign In')} >
          Sign In
        </h2> 
        <h2 className={`style.Up ${action === 'Sign Up' ? 'selected' : ''}`} 
        onClick = {() => setAction('Sign Up')} >
          Sign Up
        </h2>
      </div>
      <div className={style.container}>
        <div className={style.header}> 
          <div className={style.text}>{action}</div>
        </div>
        <div className={style.inputs}>
          {action === 'Sign In' ? <div></div> : <div className={style.input}>
            <input type="text" placeholder='first-name' required/>
            </div>}
          {action === 'Sign In' ? 
            <div></div> : <div className={style.input}>
            <input type="text" placeholder='last-name'/>
            </div>}  
           
          <div className={style.input}>
            <input type="email" placeholder='email' value={email} 
            onChange={(e) => setEmail(e.target.value)} required/>

          </div>
          <div className={style.input}>
            <input type="password" placeholder='password'value={password} 
            onChange={(e) => setPassword(e.target.value)} required/>

          </div>
          {action === 'Sign In' ? <div></div> : <div className={style.input}>
            <input type="date" placeholder='dd-mm-yyyy' required/>

          </div>}
           
           
          
          {action === 'Sign In' ? <div></div> : <div className={style.input}>
            <p>
              <input type="radio" name="gender" className={style.gender} required/><label htmlFor="male" className={style.gender}>Male</label>
              <input type="radio" name="gender" className={style.gender} required/> <label htmlFor="female" className={style.gender}>Female</label>
              <input type="radio" name="gender" className={style.gender} required/> <label htmlFor="other" className={style.gender}>Other</label>
            </p>
            
          </div>}
          {/* <div className={style.forgotpassword} >Lost Password ? <span>Click Here!</span></div> */}
          <button type = "submit" className={style.submit}>Submit</button>
           
        </div>
        
      </div>
      </form>
       
    </div>  
    
  )
}

export default Navbar