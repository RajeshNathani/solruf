import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { useEffect, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBVNXA85EuSdgdgNC_lLFGLEat6LxIlU_Q",
    authDomain: "solaruf-eda9a.firebaseapp.com",
    projectId: "solaruf-eda9a",
    storageBucket: "solaruf-eda9a.appspot.com",
    messagingSenderId: "298464787796",
    appId: "1:298464787796:web:b5eaf57e954643fd4c9cc1",
    measurementId: "G-J7RBX7XCBQ"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth =  getAuth(); 
const storage = getStorage();
export function register(email, password){
   return createUserWithEmailAndPassword(auth, email, password)
}

export function useAuth(){
    const [currentUser, setCurrentUser] = useState('')
    useEffect(() => {
        onAuthStateChanged(auth, user=>{
            setCurrentUser(user)});
    }, [])
    
    return currentUser
}

export function logout(){
    return signOut(auth)
}

export function signin(email, password){
    return signInWithEmailAndPassword(auth, email, password)
}


//storage

export async function upload(currentUser, file, setLoading,name){
    const fileRef = ref(storage, currentUser.uid+'.png')
    setLoading(true)
    if(file !== null){
        const snapshot = await uploadBytes(fileRef, file)
    }
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(currentUser, {
        displayName: name, photoURL
      }).then(() => {
        //
      }).catch((error) => {
        alert(error)
      });    
      setLoading(false)
    alert("Profile Updated")
    window.location.reload(false);
}
export default app;

