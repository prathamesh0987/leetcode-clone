import { sendSignInLinkToEmail, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../App";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();



const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:5173',
    // This must be true.
    handleCodeInApp: true,
  };

export const Signin = () => {
    
    const [email, setEmail] = useState("");

    async function onSignin() {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
                alert("sent email")
                // ...
            })
            .catch((error) => {
                alert("sent not sent")
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });

    }

    async function onSigninwithgoogle() {
        signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if(!credential){
                return;
            }
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            });

    }

    return <div>
        <input type="text" placeholder="email" onChange={(e) => {
            setEmail(e.target.value);
        }}>
        </input>
        <button onClick={() => {
            onSignin()
        }}>
            Signup
        </button>
        <br></br>
        <button onClick={() => {
            onSigninwithgoogle()
        }}>
            Login with Google
        </button>
    </div>
}