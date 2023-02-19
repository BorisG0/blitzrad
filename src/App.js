import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDnz1D2DLCObjUTg8drrP9FSgNymZPzHjw",
  authDomain: "blitzrad-19056.firebaseapp.com",
  projectId: "blitzrad-19056",
  storageBucket: "blitzrad-19056.appspot.com",
  messagingSenderId: "939189443643",
  appId: "1:939189443643:web:afba94b3061db3d431501e"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">

      <header className="App-header">
        <h1>⚡Blitzrad⚡</h1>
        <SignOut />
      </header>

      <section>
        {user ? <BikeSelection/> : <SignIn/>}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function BikeSelection() {

  const bikesRef = firestore.collection('bikes');
  const query = bikesRef.limit(25);

  const [bikes] = useCollectionData(query, {idField: 'id'});

  return(
    <>
      <h2>Bike Selection</h2>
      {bikes && bikes.map(b => <BikeDisplay key={b.id} bike={b} />)}
    </>
  )
}

function BikeDisplay(props){
  const {type, color} = props.bike;

  return <p>🚲: {type}, {color}</p>
}

export default App;
