import { useEffect } from "react";
import Beowulf from './assets/Beowulf.jpg'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"

const Login = (props) => {

  const {handleLogin, handleUserName} = props;

  const auth = getAuth();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then(() => {
      handleLogin(true);
    }).catch((error) => {
      console.log(error)
    })
}

useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            handleLogin(true)
            handleUserName(user.uid)
        } else {
            handleLogin(false)
            handleUserName("")
        }
    });
}, [auth, handleLogin, handleUserName])

  return (
    <div className="wrapper">
        <div className="loginContainer wrapper">
          <img src={Beowulf} alt="a sculpture of the hero Beowulf" />
          <div className="loginText">
            <h2>Welcome to the Hero's Journey App!</h2>
            <p>This app will guide you through the process of creating a hero's journey for your own character, be it for a story or a tabletop RPG or even just a learning exercise!</p>
            <p>On the next screen you will be asked to select a hero to use as an example to help you!</p>
            <button onClick={googleSignIn}>Log In!</button>
          </div> 
        </div>
      
    </div>
);
    
    }

export default Login;