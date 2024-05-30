import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import {db} from "./FirebaseConfig";
import { doc, setDoc } from "firebase/firestore"; 
import {useNavigate} from 'react-router-dom'


export default function Homepage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect=useNavigate()

  const handlesignup = async() => {
    const auth = getAuth();
   const userCredential= await createUserWithEmailAndPassword(auth, email, password) 
    const userid = userCredential.user.uid;
    await setDoc(doc(db, "user",userid), {
        email ,
        password, 
      });
      
  };

  const handlesignIn=()=>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user.uid;
        if(user){
          sessionStorage.setItem('uid',user)
         redirect('/Homepage')
        }
       
      })
      .catch((error) => {
        console.log(error);
        alert('Invaild User')
      });
  }
  return (
    <div>
      <input
        type="email"
        placeholder="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter Your Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handlesignup}>Sign UP</button>
      <button onClick={handlesignIn}>Sign In</button>
    </div>
  );
}
