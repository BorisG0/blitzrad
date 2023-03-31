//import * as React from 'react';
import React, { useState, useEffect, useMemo } from 'react';
import {List, ListItem, ListItemButton, ListItemText, Button, ToggleButton, ToggleButtonGroup} from '@mui/material';
import { useCollectionData, useCollection } from 'react-firebase-hooks/firestore';
import {DatePicker} from '@mui/x-date-pickers'
import { getDistance } from 'geolib';
import firebase from "./firebase";
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js';
import { sendThisMail } from './SendMail';
import { Snackbar } from '@mui/material';

const firestore = firebase.firestore();
const auth = firebase.auth();


export function LocationSelection(props){
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);

    const locationsRef = firestore.collection('locations');
    const bookingsRef = firestore.collection('bookings');
    const pricingRef = firestore.collection('pricing');

    const [selectedDate, setSelectedDate] = React.useState(null);

    const paypalOptions = {
        "client-id": "AdCgq612duLsoz1YMIH8B4tSNBpWtJtlfXE0TZ1wGIegRuDKc7Sg1Y95gq7Z_24rlieuHC6pKsbrWgzi", 
        "currency": "EUR"
    }
    const [showPayPal, setShowPayPal] = useState(false);

    const [diffDays, setDiffDays] = useState(0);
    const [calculatedPrice, setCalculatedPrice] = useState(0);

    const handleDateChange = (date) => {
      setSelectedDate(date);
      //get todays date
        const today = new Date();
        //get the difference between the two dates
        const diffTime = Math.abs(date - today);
        //convert the difference to days
        const diffDaysTemp = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDiffDays(diffDaysTemp);
    }

    const calculatePrice = async () => {
        const querySnapshot = await pricingRef.where('type', '==', selectedType).get();
        if (!querySnapshot.empty) {
            const selectedPricingRef = querySnapshot.docs[0].ref;
            const selectedPricingDoc = await selectedPricingRef.get();
            const pricePerDay = selectedPricingDoc.data().pricePerDay;
            const basePrice = selectedPricingDoc.data().basePrice;
            const calculatedPriceTemp = basePrice + (pricePerDay * diffDays);

            setCalculatedPrice(calculatedPriceTemp);
        }
    }

    useEffect(() => {
        calculatePrice();
      }, [diffDays]);

    const query = locationsRef.limit(25);
    const [locations] = useCollectionData(query, {idField: 'id'});
    const [pricing] = useCollectionData(pricingRef, {idField: 'id'});

    const [selectedType, setSelectedType] = React.useState("Bike");

    const handleTypeChange = (event, newSelectedType) => {
        setSelectedType(newSelectedType);
      };

    const handleBooking = () => {
        //create a paypal payment popup
        setShowPayPal(true)

        //saveBooking();
    }

    const saveBooking = async (e) => {
        const { uid } = auth.currentUser;
        const rentEndTimestamp = firebase.firestore.Timestamp.fromDate(new Date(selectedDate));

        const querySnapshot = await locationsRef.where('name', '==', props.selectedLocation).get();
        if (!querySnapshot.empty) {
            const selectedLocationRef = querySnapshot.docs[0].ref;
        
            await bookingsRef.add({
            bookedAt: firebase.firestore.FieldValue.serverTimestamp(),
            uId: uid,
            type: selectedType,
            location: props.selectedLocation,
            rentStart: firebase.firestore.FieldValue.serverTimestamp(),
            rentEnd: rentEndTimestamp,
            pricePaid : calculatedPrice
            })

            if(selectedType == "Bike")
            await selectedLocationRef.update({
                bikeCounter: firebase.firestore.FieldValue.increment(-1)
            });

            if(selectedType == "E-Bike")
            await selectedLocationRef.update({
                ebikeCounter: firebase.firestore.FieldValue.increment(-1)
            });

            if(selectedType == "Scooter")
            await selectedLocationRef.update({
                scooterCounter: firebase.firestore.FieldValue.increment(-1)
            });

            setSelectedDate(null);
        }
        
        setShowPayPal(false);
        sendThisMail(auth.currentUser, calculatedPrice)
        setSnackBarOpen(true);
      }

    return(
        <div>
            <Snackbar
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
                open={snackBarOpen}
                onClose={() => setSnackBarOpen(false)}
                autoHideDuration={4000}
                message="Booking successful!"

              />

            {showPayPal && (
                <>
            <h2>Checkout</h2>
            <p>
                selected location: {props.selectedLocation} <br/>
                selected type: {selectedType} <br/>
                number of days: {diffDays} <br/>
                calculated price: {calculatedPrice},00€ <br/>
            </p>
                <PayPalScriptProvider options={paypalOptions}>
                    <PayPalButtons           createOrder={(data, actions) => {
                        return actions.order.create({
                        purchase_units: [
                            {            
                            amount: {
                                value: calculatedPrice,
                            },
                            },
                        ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        const details = await actions.order.capture();
                        saveBooking();
                    }}/>
                </PayPalScriptProvider>
            </>)}

            {!showPayPal && (<>

            <h2>Location Selection</h2>
            <ToggleButtonGroup value={selectedType} exclusive onChange={handleTypeChange}>
                <ToggleButton value="Bike">Bike</ToggleButton>
                <ToggleButton value="E-Bike">E-Bike</ToggleButton>
                <ToggleButton value="Scooter">Scooter</ToggleButton>
            </ToggleButtonGroup>
            

            <List>
                {locations && locations.map(l => <LocationDisplay key={l.name} loc={l}
                clickEvent={props.handleLocationClick} sLoc={props.selectedLocation}
                handleBooking={handleBooking}
                selectedDate = {selectedDate} handleDateChange={handleDateChange}
                selectedType = {selectedType}
                />)}
            </List></>)}
        </div>
    )
  }

  function LocationDisplay(props){
    const userPosition = {lat:49.48, lng: 8.47}

    const {id ,name, location, bikeCounter, ebikeCounter, scooterCounter} = props.loc;
    const pos = {lat: location._lat,lng: location._long}
    const dist = getDistance(userPosition, pos);
  
    return (
        <>
        {((props.selectedType == "Bike") && bikeCounter > 0)
        || ((props.selectedType == "E-Bike") && ebikeCounter > 0)
        || ((props.selectedType == "Scooter") && scooterCounter > 0)?
        
        <ListItemButton onClick={(event) =>props.sLoc == name? null: props.clickEvent(event, name)}
        selected={props.sLoc == name} disableRipple>
            <ListItemText  secondaryTypographyProps={{ sx: { color: "black" } }}
             primary={name}
             secondary={
                <>
                    <>📍 {dist}m</>
                    {props.selectedType == "Bike"? <> bikes: {bikeCounter}</>: null}
                    {props.selectedType == "E-Bike"? <> e-bikes: {ebikeCounter}</>: null}
                    {props.selectedType == "Scooter"? <> scooters: {scooterCounter}</>: null}
                    <br/>
                    <>{(props.sLoc == name) ? (<>
                    <DatePicker label="end of rental" value={props.selectedDate} onChange={props.handleDateChange}/>
                    <br/>

                    {props.selectedDate ? <Button variant="contained" onClick={props.handleBooking}>book</Button>: null}
                    
                    </>): null}</>
                </>
             }/>
        </ListItemButton> : null}
        </>
    )
  }