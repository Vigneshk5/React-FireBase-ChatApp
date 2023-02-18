import React, { useState } from "react";
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
  appId: "1:46358419361:web:bcef797c6c6d831b719de0",
  measurementId: "G-33VTTCSHCQ",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth);
function App() {
  return (
    <div>
      <div>
        {messages &&
          messages.msp((msg) => <ChatRoom key={msg.id} message={msg} />)}
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
  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser();
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimeStamp(),
      uid,
      photoURL,
    });

    setFormValue("");
  };
  return (
    <>
      <div>
        {message &&
          message.msp((msg) => <ChatRoom key={msg.id} message={msg} />)}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={setFormValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">🕊️</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.messages;
  const messageClass = (uid = auth.currentUser ? "send" : "recived");
  return (
    <div className={` message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
}

export default App;
