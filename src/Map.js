import React, { useState, useRef, useEffect } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css" 
import L from "leaflet"
//import { required } from 'yargs';
import icon from 'leaflet/dist/images/marker-icon.png';
import testIcon from "./images/bicycle.png"
import { TextField } from '@mui/material';

import firebase from 'firebase/compat/app';
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


const bikeIcon = new L.icon({
  iconUrl: testIcon,
  //iconUrl: icon,

  iconSize: [100,100],
});

export function MapScreen(){
  const firestore = firebase.firestore();
  const locationsRef = firestore.collection('locations');

    const [center, setCenter] = useState({ lat:49.479038, lng:8.470520});
    const ZOOM_LEVEL = 14;
    const mapRef = useRef()
    const firstMarkerPosition = {lat:49.48, lng: 8.47}
    const secondMarkerPosition = {lat:49.47, lng: 8.48}

    const [input, setInput] = useState('');
    const [testLocations, setTestLocations] = useState([])

    useEffect(() => {
      locationsRef.onSnapshot(snapshot =>{
        setTestLocations(snapshot.docs.map(doc => ({id: doc.id, testLocation: doc.data().location })))
      })
    })

    return(
      <>
      <MapContainer 
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
      >
        <TileLayer url="https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=p6caGMw9wAWLQ1WY2WIh"
        attribution='https://api.maptiler.com/maps/openstreetmap/256/tiles.json?key=p6caGMw9wAWLQ1WY2WIh'
        />

        {testLocations.map(testLocation=> (
          <Marker position={{
            lat: testLocation.testLocation._lat,
            lng: testLocation.testLocation._long
            }} icon={bikeIcon} >
            <Popup>
            Here are 5 vehicles available.
          </Popup>
          </Marker>
        ))}
      </MapContainer>
      </>
    )
}

export function RegionSelection(){
    const locationsRef = firestore.collection('locations');
    const query = locationsRef.limit(25);

    const [locations] = useCollectionData(query, {idField: 'id'});

    return(
        <div>
            <h2>Location Selection</h2>
            <div>
                {locations && locations.map(l => <LocationDisplay key={l.id} loc={l} />)}
            </div>
        </div>
    )
  }

  function LocationDisplay(props){
    const {name} = props.loc;
  
    return <p>🚲: {name}</p>
  }