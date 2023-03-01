import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import Button from '@mui/material/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import {LocationSelection } from './LocationSelection';
import {MapScreen} from './MapScreen'
import { RegionSelection } from './RegionSelection';

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h1>⚡Blitzrad⚡</h1>
        {user ? <SignOut/>: <SignIn/>}
      </header>
      <section>
        <RegionSelection/>
        <div id="bodyMainView" className="Map-parent">
          <LocationSelection className="Region-selection"/>
          <MapScreen className="Map-screen" />
        </div>
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
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <Button variant="contained" className="sign-out" onClick={() => auth.signOut()}>Sign Out</Button>
  )
}

export default App;
