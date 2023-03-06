import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from './firebase';

const firestore = firebase.firestore();

const auth = firebase.auth();

export function Account() {
    //user geht auch nicht wenn man seite neu lädt
    const [user] = useAuthState(auth)

    const bookingsRef = firestore.collection('bookings');

    const query = bookingsRef.where("uId", "==", "crW5255058ReQgNMrQ9R3eks7Op1");

    const [bookings] = useCollectionData(query, { idField: 'id' });
    console.log(bookings)
    //const [bookingData,setBookingData]= useState([]);

    /*firebase.firestore().collection("bookings").where("uId", "==", "crW5255058ReQgNMrQ9R3eks7Op1").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //setBookingData([doc.data().Adress]);
            var tempBookingData = doc.data();
            setBookingData(arr => [...arr , tempBookingData]);
            console.log(tempBookingData)
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });*/



    return (
        <Grid2 container spacing={2}>
            <Grid2 xs={12} md={6}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Your Bookings
                </Typography>
                <List >
                    {bookings && bookings.map(booking =>
                        <ListItem key={booking.bookedAt}>
                            <ListItemText
                            //parse date to string


                                primary={booking.bookedAt.toString()}
                                secondary="Date: 12.01.2023"
                            />
                        </ListItem>
                    )}

                </List>
            </Grid2>
            <Grid2 xs={12} md={6}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Personal Information
                </Typography>
                <List >
                    <ListItem >
                    {user? user.displayName : "your name" }
                        <TextField
                            disabled
                            id="filled-disabled"
                            label="Name"
                            defaultValue={user? user.displayName : "your name" }
                            variant="filled"
                        >
                                                        {user? user.displayName : "t" }

                        </TextField>
                    </ListItem>


                </List>
            </Grid2>
        </Grid2>
    )
}