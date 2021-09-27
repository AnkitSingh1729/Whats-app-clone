import React from 'react'
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from "./StateProvider"

function Login() {
    const [{user}, dispatch] = useStateValue();

    const signIn = () => {
        auth
        .signInWithPopup(provider) // We set up "provider in our firebase.js file"
        .then((result) => {
            console.log(result)
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch((error) => alert(error.message));
            
    };
    return ( 
        <div className="login">
            <div className="login__container">
                <img 
                    src="https://upload.wikimedia.org/wikipedia"
                    alt=""
                />
                <div className="login__text">
                    <h1>Sign in to Whatsapp</h1>
                </div>
                {/* It's material ui, capital "B", Button. Therefore it's imported*/}
                <Button onClick={signIn}>
                    Sign in With Google
                </Button>

            </div>
        </div>
    );
}

export default Login;
