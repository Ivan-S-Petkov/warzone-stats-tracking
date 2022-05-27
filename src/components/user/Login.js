import './Login.sass';
import React from 'react';
import { useNavigate } from 'react-router';
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used

const providerFacebook = new FacebookAuthProvider();
const providerGoogle = new GoogleAuthProvider();
const auth = getAuth();

function Login() {
  const navigate = useNavigate();

  function loginHandler(e) {
    let provider = providerFacebook;
    if (e.target.parentElement.outerHTML.includes('facebook')) {
      provider = providerFacebook;
    } else {
      provider = providerGoogle;
    }

    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(user);
        navigate('/');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div className="login">
      <div>Select Login Method:</div>
      <div className="icons">
        <div onClick={loginHandler}>
          <a>
            <FontAwesomeIcon icon={brands('facebook-f')} />
          </a>
        </div>
        <div onClick={loginHandler}>
          <a>
            <FontAwesomeIcon icon={brands('google')} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
