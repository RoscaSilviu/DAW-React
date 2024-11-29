import React from "react";
import './SignInSignUp.css';
function Home(){
    const logout=()=>{
        localStorage.removeItem("signUp")
        window.location.reload()
    }
    
    return(
        <div>
            <h1>Salut! </h1>
            <button onClick={logout} className="logout">LogOut</button>
        </div>
    );
}
export default Home;