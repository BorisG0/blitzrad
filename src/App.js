import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import Button from '@mui/material/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RegionSelection } from './RegionSelection';
import { MainView } from './mainView';
import { Routes, Route } from 'react-router-dom';

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
    <div className="App">
      <header className="App-header">
        <h1 className='Title'>⚡Blitzrad⚡</h1>
        {user ? <SignOut/>: <SignIn/>}
      </header>
       <Routes>
          <Route path="/" element={<MainView/>} />
          <Route path="/region" element={<RegionSelection />} />
       </Routes>
       </div>
    </>
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
