import * as React from 'react';
import {List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getDistance } from 'geolib';
import firebase from "./firebase"

const firestore = firebase.firestore();


export function LocationSelection(props){
    const locationsRef = firestore.collection('locations');
    const bookingsRef = firestore.collection('bookings');

    const query = locationsRef.limit(25);
    const [locations] = useCollectionData(query, {idField: 'id'});

    const saveBooking = async (e) => {
        e.preventDefault();
    
        //const { uid } = auth.currentUser;

        await bookingsRef.add({
          bookedAt: firebase.firestore.FieldValue.serverTimestamp(),
          uId: "test user",
          type: "Bike",
          location: props.selectedLocation
        })
      }

    return(
        <div>
            <h2>Location Selection</h2>
            <List>
                {locations && locations.map(l => <LocationDisplay key={l.name} loc={l}
                clickEvent={props.handleLocationClick} sLoc={props.selectedLocation}
                saveBooking={saveBooking}/>)}
            </List>
        </div>
    )
  }

  function LocationDisplay(props){
    const userPosition = {lat:49.48, lng: 8.47}

    const {id ,name, location} = props.loc;
    const pos = {lat: location._lat,lng: location._long}
    const dist = getDistance(userPosition, pos);
  
    return (
        <ListItemButton onClick={(event) => props.clickEvent(event, name)} selected={props.sLoc == name}>
            <ListItemText  secondaryTypographyProps={{ sx: { color: "white" } }}
             primary={name}
             secondary={
                <>
                    <>📍 {dist}m</>
                    <br/>
                    <>{(props.sLoc == name) ? (<>
                    lol
                    <Button variant="contained" onClick={props.saveBooking}>book</Button>
                    </>): null}</>
                </>
             }/>
        </ListItemButton>
    )
  }