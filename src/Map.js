import React, { useState, useRef, useEffect } from "react";


//import { required } from 'yargs';

import { TextField, List, ListItem, ListItemText } from '@mui/material';

import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { getDistance } from 'geolib';


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








export function RegionSelection(){
    const locationsRef = firestore.collection('locations');
    const query = locationsRef.limit(25);
    

    const [locations] = useCollectionData(query, {idField: 'id'});

    return(
        <div>
            <h2>Location Selection</h2>
            <List>
                {locations && locations.map(l => <LocationDisplay key={l.name} loc={l} />)}
            </List>
        </div>
    )
  }

  function LocationDisplay(props){
    const userPosition = {lat:49.48, lng: 8.47}

    const {id ,name, location} = props.loc;
    const pos = {lat: location._lat,lng: location._long}
    const dist = getDistance(userPosition, pos);
    console.log("location:", location, " name:",name)
    console.log("dist: ", dist)
  
    return (
        <ListItem button>
            <ListItemText  secondaryTypographyProps={{ sx: { color: "white" } }}
             primary={name} secondary={"📍 "+dist+"m"}/>
        </ListItem>
    )
  }