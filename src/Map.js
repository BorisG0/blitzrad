import React, { useState, useRef, useEffect } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css" 
import L from "leaflet"
//import { required } from 'yargs';
import icon from 'leaflet/dist/images/marker-icon.png';

import { TextField } from '@mui/material';

import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';



const bikeIcon = new L.icon({
  //iconUrl: "./bicycle.png",
  iconUrl: icon,

  iconSize: [35,45],
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
        setTestLocations(snapshot.docs.map(doc => ({id: doc.id, testLocation: doc.data().myLocation })))
      })
    })
    //const query = locationsRef.limit(25);
  
    //const [locations] = useCollectionData(query, {idField: 'id'});
    //var varTestLocation = {lat: locations[0].location._lat, lng:locations[0].location._long}
    //console.log(locations)
    //console.log(locations[0].location._lat)
    //console.log(locations[0].location._long)

    //var testLocation = {lat:0, lng:0}
    //locations && locations.map(b => testLocation=b.location )
    var myTest = {lat: 0.0, lng: 0.0}

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
        {testLocations.map(testLocation=> (
          <Marker position={testLocation.testLocation} icon={bikeIcon} >
            <Popup>
          </Popup>
          </Marker>
        ))}
      </MapContainer>
      </>
    )
}

export function RegionSelection(){
    return(
      <>
      test
        <TextField id="outlined-basic" label="Ort" variant="outlined" />
      </>
    )
  }