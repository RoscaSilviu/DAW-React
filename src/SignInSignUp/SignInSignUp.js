import React, { useEffect, useRef, useState } from "react";
import Home from "./Home";
import './SignInSignUp.css';

function SignInSignupWithLocalStorage() {
   const name = useRef();
   const email = useRef();
   const password = useRef();
   const [showHome, setShowHome] = useState(false);
   const [showSignUp, setShowSignUp] = useState(false); // Controlam paginile Login / SignUp
   const localSignUp = localStorage.getItem("signUp");
   const users = JSON.parse(localStorage.getItem("users")) || []; // Get all users

   useEffect(() => {
      if (localSignUp) {
         setShowHome(true);
      }
   }, [localSignUp]);

   const handleClick = () => {
      if (name.current.value && email.current.value && password.current.value) {
         // Check if user already exists
         const userExists = users.find(user => user.email === email.current.value);
         if (userExists) {
            alert("User already exists! Please log in.");
         } else {
            // Add new user to the users array
            const newUser = {
               name: name.current.value,
               email: email.current.value,
               password: password.current.value
            };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("signUp", email.current.value);
            alert("Account created successfully!!");
            window.location.reload();
         }
      }
   };

   const handleSignIn = () => {
      const user = users.find(user => user.email === email.current.value);
      if (user && user.password === password.current.value) {
         localStorage.setItem("signUp", user.email);
         window.location.reload();
      } else {
         alert("Please Enter valid Credentials");
      }
   };

   const toggleSignUpPage = () => {
      setShowSignUp(!showSignUp);
   };

   return (
      <div>
         {showHome ? (
            <Home />
         ) : showSignUp ? (
            <div className="container">
               <h1>Sign Up</h1>
               <div className="input_space">
                  <input placeholder="Name" type='text' ref={name} />
               </div>
               <div className="input_space">
                  <input placeholder="Email" type='text' ref={email} />
               </div>
               <div className="input_space">
                  <input placeholder="Password" type='password' ref={password} />
               </div>
               <button onClick={handleClick}>Sign Up</button>
               <button onClick={toggleSignUpPage}>Already have an account? Login</button>
            </div>
         ) : (
            <div className="container">
               <h1>Login</h1>
               <div className="input_space">
                  <input placeholder="Email" type='text' ref={email} />
               </div>
               <div className="input_space">
                  <input placeholder="Password" type='password' ref={password} />
               </div>
               <button onClick={handleSignIn}>Sign In</button>
               <button onClick={toggleSignUpPage}>Don't have an account? Sign Up</button>
            </div>
         )}
      </div>
   );
}

export default SignInSignupWithLocalStorage;
