import React from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBd_Unt3htZRHIjIzqfuEnuwbbfqPMlHVc",
  authDomain: "chatapp-37c06.firebaseapp.com",
  projectId: "chatapp-37c06",
  storageBucket: "chatapp-37c06.appspot.com",
  messagingSenderId: "46358419361",
  appId: "1:46358419361:web:5b1857a4af565f9f719de0",
  measurementId: "G-SG7QRH67T8",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth);
function App() {
  return (
    <div>
      <div>
        {messages &&
          message.msp((msg) => <ChatRoom key={msg.id} message={msg} />)}
      </div>
      <header></header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const useSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={useSignInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.SignOut}>Sign Out</button>
  );
}

function ChatRoom() {
  const messagesRef = firestore.collection("message");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [message] = useCollectionData(query, { inField: id });
}

function ChatMessage(props) {
  const { text, uid } = props.messages;
  return <p>{text}</p>;
}

export default App;
