import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import Button from '@mui/material/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import {RegionSelection } from './RegionSelection';
import {MapScreen} from './MapScreen'

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h1>⚡Blitzrad⚡</h1>
        <SignOut />
      </header>
      <section>
        {user ? <div id="bodyMainView" className="Map-parent"> <RegionSelection className="Region-selection"/>
         <MapScreen className="Map-screen" /> </div> : <SignIn/>}
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
      <Button variant="contained" className="sign-in" onClick={signInWithGoogle}>Sign in with Google</Button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <Button variant="contained" className="sign-out" onClick={() => auth.signOut()}>Sign Out</Button>
  )
}

export default App;
