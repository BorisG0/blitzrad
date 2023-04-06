import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from '@mui/material/Typography';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from './firebase';
import './Account.css';
import QRCode from 'react-qr-code';
import { Link, useNavigate  } from 'react-router-dom';


const firestore = firebase.firestore();
function otherQrCode(url) {
    return (
        <QRCode 
            title="Scan Booking"
            value={url}
            bgColor={'#FFFFFF'}
            fgColor={'#000000'}
            size={128}
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
        if(minmin.toString().length == 1){
            minmin = 0 + minmin.toString()
        }
        if(hh.toString().length == 1){
            hh = 0 + hh.toString()
        }
        return dd + "." + mm + "." + yyyy + " " + hh + ":" + minmin
    }else{
        return dd + "." + mm + "." + yyyy
    }
}
export function Account() {
    const [query, setQuery] = useState()
    const [bookings] = useCollection(query, { idField: 'id' });
    const [user, loading, error] = useAuthState(auth);
    const history = useNavigate();
    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
        const bookingsRef = firestore.collection('bookings');
        if (query == undefined) {
            setQuery(bookingsRef.orderBy("bookedAt", "desc"));
        }
        return (
            <>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
                    Your Bookings
                </Typography>
                <Grid2 container id="body">
                    {bookings && bookings.docs.map(booking =>
                    <>
                    {(user && user.uid == booking.data().uId)?
                        <Grid2 id="oneBooking" xs={12} md={6} key={booking.id} container style={{maxWidth: "2000px", margin: "auto"}} sx={{ border: 0.5, textAlign: "center" }}>
                                <Grid2 id="dataInBooking" xs={6} container rowSpacing={1} style={{maxWidth: "500px", margin: "auto"}}>
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
                                    <Grid2 xs={6}>
                                        Price:
                                    </Grid2>
                                    <Grid2 xs={6}>
                                        {booking.data().pricePaid},00€
                                    </Grid2>
                                </Grid2>
                                <Grid2 component={Link} to={`/scanned/${booking.id}`} xs={6} style={{maxWidth: "100px", margin: "auto"}}>
                                    {otherQrCode("https://hackernoon.com/how-to-build-a-qr-code-generator-in-react")}
                                </Grid2>
                        </Grid2>
                        : null}
                        </>
                    )}
                </Grid2>
            </>
        )
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        history('/');

        return <div> Nothing here... maybe you are not logged in? </div>;
    }
}
