import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useState, useEffect, useMemo } from 'react';
import { useCollectionData, useCollection } from 'react-firebase-hooks/firestore';
import firebase from './firebase';
import './Account.css';
import { QRCodeCanvas } from "qrcode.react";
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const firestore = firebase.firestore();
function otherQrCode(url) {
    return (
        <QRCode 
            title="GeeksForGeeks"
            value={url}
            bgColor={'#FFFFFF'}
            fgColor={'#000000'}
            size={256}
        />)
}
function qrCode(url) {
    return (
        <QRCodeCanvas style={{borderStyle: "solid", borderWidth: "5px"}}
            id="qrCode"
            value={url}
            size={300}
            bgColor={"#ffffff"}
            level={"H"}
        />)
}
const auth = firebase.auth();
export function getNiceDate(date, withTime) {
    let dd = date.toDate().getDate()
    let mm = date.toDate().getMonth()+1
    let yyyy = date.toDate().getFullYear()
    let hh = date.toDate().getHours()
    let minmin = date.toDate().getMinutes()
    if(withTime){
        return dd + "." + mm + "." + yyyy + " " + hh + ":" + minmin
    }else{
        return dd + "." + mm + "." + yyyy
    }
}
export function Account() {
    const [query, setQuery] = useState()
    const [bookings] = useCollection(query, { idField: 'id' });
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
        const bookingsRef = firestore.collection('bookings');
        if (query == undefined) {
            setQuery(bookingsRef.where("uId", "==", user.uid));//.orderBy("bookedAt", "desc"))
        }
        return (
            <>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Your Bookings
                </Typography>
                <List id="test" sx={{ position: "center" }}  >
                    {bookings && bookings.docs.map(booking =>
                        <ListItem key={booking.id} sx={{ border: 0.5, textAlign: "center" }}>
                            <Grid2 container >

                                <Grid2 xs={6} container rowSpacing={1}>
                                    <Grid2 xs={6}  >
                                        Location:
                                    </Grid2>
                                    <Grid2 xs={6}  >
                                        {booking.data().location}
                                    </Grid2>
                                    <Grid2 xs={6}  >
                                        Booked at:
                                    </Grid2>
                                    <Grid2 xs={6}>
                                        {getNiceDate(booking.data().bookedAt, true)}
                                    </Grid2>
                                    <Grid2 xs={6}>
                                        Rent start:
                                    </Grid2>
                                    <Grid2 xs={6}>
                                        {getNiceDate(booking.data().rentStart, false)}
                                    </Grid2>
                                    <Grid2 xs={6}>
                                        Rent end:
                                    </Grid2>
                                    <Grid2 xs={6}>
                                        {getNiceDate(booking.data().rentEnd, false)}
                                    </Grid2>
                                    <Grid2 xs={6}>
                                        Type:
                                    </Grid2>
                                    <Grid2 xs={6}>
                                        {booking.data().type}
                                    </Grid2>
                                </Grid2>
                                <Grid2 xs={6} >
                                    {otherQrCode("https://hackernoon.com/how-to-build-a-qr-code-generator-in-react")}
                                </Grid2>
                            </Grid2>
                            <Button component={Link} to={`/scanned/${booking.id}`}> mein Button </Button>
                        </ListItem>
                    )}
                </List>
            </>
        )
    } else if (error) {
        console.log("error")
        return <div>There was an authentication error.</div>;
    } else {
        return <div> Nothing here... maybe you are not logged in? </div>;
    }
}