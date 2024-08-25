import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = () => {
    if (isRegistering) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Registered:", userCredential.user);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Logged in:", userCredential.user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>
        {isRegistering ? "Register" : "Login"}
      </button>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
}

export default Auth;
