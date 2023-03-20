//import * as React from 'react';
import React, { useState, useEffect, useMemo } from 'react';
import {List, ListItem, ListItemButton, ListItemText, Button, ToggleButton, ToggleButtonGroup} from '@mui/material';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {DatePicker} from '@mui/x-date-pickers'
import { getDistance } from 'geolib';
import firebase from "./firebase";
import { RegionSelection } from './RegionSelection';

const firestore = firebase.firestore();
const auth = firebase.auth();


export function LocationSelection(props){
    const locationsRef = firestore.collection('locations');
    const bookingsRef = firestore.collection('bookings');

    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    }

    const query = locationsRef.limit(25);
    const [locations] = useCollectionData(query, {idField: 'id'});

    const [selectedType, setSelectedType] = React.useState("Bike");
    const handleChange = (newSelectedType) => {
        setSelectedType(newSelectedType);
      };

    const control = {
        value: selectedType,
        onChange: handleChange,
        exclusive: true,
    };

    const saveBooking = async (e) => {
        e.preventDefault();
    
        const { uid } = auth.currentUser;
        const rentEndTimestamp = firebase.firestore.Timestamp.fromDate(new Date(selectedDate));

        await bookingsRef.add({
          bookedAt: firebase.firestore.FieldValue.serverTimestamp(),
          uId: uid,
          type: "Bike",
          location: props.selectedLocation,
          rentStart: firebase.firestore.FieldValue.serverTimestamp(),
          rentEnd: rentEndTimestamp
        })
        setSelectedDate(null);
      }

    return(
        <div>
            <h2>Location Selection</h2>
            <ToggleButtonGroup value={selectedType} onChange={handleChange}>
                <ToggleButton value="Bike" {...control}>Bike</ToggleButton>
                <ToggleButton value="E-Bike" {...control}>EBike</ToggleButton>
                <ToggleButton value="Scooter" {...control}>Scooter</ToggleButton>
            </ToggleButtonGroup>
            

            <List>
                {locations && locations.map(l => <LocationDisplay key={l.name} loc={l}
                clickEvent={props.handleLocationClick} sLoc={props.selectedLocation}
                saveBooking={saveBooking}
                selectedDate = {selectedDate} handleDateChange={handleDateChange}
                />)}
            </List>
        </div>
    )
  }

  function LocationDisplay(props){
    const userPosition = {lat:49.48, lng: 8.47}

    const {id ,name, location, bikeCounter, ebikeCounter, scooterCounter} = props.loc;
    const pos = {lat: location._lat,lng: location._long}
    const dist = getDistance(userPosition, pos);
  
    return (
        <ListItemButton onClick={(event) =>props.sLoc == name? null: props.clickEvent(event, name)}
        selected={props.sLoc == name} disableRipple>
            <ListItemText  secondaryTypographyProps={{ sx: { color: "black" } }}
             primary={name}
             secondary={
                <>
                    <>📍 {dist}m bikes:{bikeCounter}</>
                    <br/>
                    <>{(props.sLoc == name) ? (<>
                    <DatePicker label="end of rental" value={props.selectedDate} onChange={props.handleDateChange}/>
                    <br/>

                    {props.selectedDate ? <Button variant="contained" onClick={props.saveBooking}>book</Button>: null}
                    
                    </>): null}</>
                </>
             }/>
        </ListItemButton>
    )
  }