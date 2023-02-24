import './App.css';

import React, { useState, useRef } from "react";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import Button from '@mui/material/Button';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { TextField } from '@mui/material';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css" 
import L from "leaflet"
//import { required } from 'yargs';

const bikeIcon = new L.icon({
  iconUrl: "/bicycle.png",
  iconSize: [35,45],
});


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

      <section class="fullhight">


        {user ? <div id="bodyMainView"> <RegionSelection class="fullhight"/> <MapScreen class="fullhight"/> </div> : <SignIn/>}
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

function RegionSelection(){
  return(
    <>
    test
      <TextField id="outlined-basic" label="Ort" variant="outlined" />
    </>
  )
}

function MapScreen(){
  const [center, setCenter] = useState({ lat:49.479038, lng:8.470520});
  const ZOOM_LEVEL = 14;
  const mapRef = useRef()
  const firstMarkerPosition = {lat:49.48, lng: 8.47}
  return(
    <>
    test2
    <MapContainer 
      center={center}
      zoom={ZOOM_LEVEL}
      ref={mapRef}
    >
      <TileLayer url="https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=p6caGMw9wAWLQ1WY2WIh"
      attribution='https://api.maptiler.com/maps/openstreetmap/256/tiles.json?key=p6caGMw9wAWLQ1WY2WIh'
      />
      <Marker position={firstMarkerPosition} icon={bikeIcon}>
        <Popup>
          Here are 5 vehicles available.
        </Popup>
      </Marker>
    </MapContainer>
    </>
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
