import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useState, useEffect, useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
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
const number = 123
const auth = firebase.auth();
function getNiceDate(date) {
    let dd = date.toDate().getDate()
    let mm = date.toDate().getMonth()
    let yyyy = date.toDate().getFullYear()
    let hh = date.toDate().getHours()
    let minmin = date.toDate().getMinutes()
    return dd + "." + mm + "." + yyyy + " " + hh + ":" + minmin
}
export function Account() {
    const [query, setQuery] = useState()
    const [bookings] = useCollectionData(query, { idField: 'id' });
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        console.log("noch nicht")
        return <div> Loading... </div>;
    } else if (user) {
        console.log(user.uid)
        const bookingsRef = firestore.collection('bookings');
        console.log(query)
        if (query == undefined) {
            console.log("changed it s")
            setQuery(bookingsRef.where("uId", "==", user.uid));//.orderBy("bookedAt", "desc")
        }
        return (
            <>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Your Bookings
                </Typography>
                <List id="test" sx={{ position: "center" }}  >
                    {bookings && bookings.map(booking =>
                        <ListItem key={booking.bookedAt} sx={{ border: 0.5, textAlign: "center" }}>
                            <Grid2 container >

                                <Grid2 xs={6} container rowSpacing={1}>
                                    <Grid2 xs={6}  >
                                        Location:
                                    </Grid2>
                                    <Grid2 xs={6}  >
                                        {booking.location}
                                    </Grid2>
                                    <Grid2 xs={6}  >
                                        Booked at:
                                    </Grid2>
                                    <Grid2 xs={6}>
                                        {getNiceDate(booking.bookedAt)}

                                    </Grid2>

                                    <Grid2 xs={6}>
                                        Rent start
                                    </Grid2>
                                    <Grid2 xs={6}>
                                        {getNiceDate(booking.rentStart)}
                                    </Grid2>
                                    <Grid2 xs={6}>
                                        Rent end
                                    </Grid2>
                                    <Grid2 xs={6}>
                                        {getNiceDate(booking.rentEnd)}
                                    </Grid2>
                                    <Grid2 xs={6}>
                                        Type
                                    </Grid2>
                                    <Grid2 xs={6}>
                                        {booking.type}
                                    </Grid2>
                                </Grid2>
                                <Grid2 xs={6} >
                                    <div style={{color: "red"}} >
                                    {otherQrCode("https://hackernoon.com/how-to-build-a-qr-code-generator-in-react")}
                                    {booking.id}
                                    </div>
                                </Grid2>
                            </Grid2>
                            <Button component={Link} to={`/scanned/${number}`}> mein Button </Button>
                        </ListItem>
                    )}

                </List>
            </>
        )
    } else if (error) {
        console.log("error")
        return <div>There was an authentication error.</div>;
    } else {
        console.log("was hier los")
        return <div> loading page </div>;
    }
}

/*export function Account() {

    const [user] = useAuthState(auth)

    const bookingsRef = firestore.collection('bookings');

    const query = bookingsRef.where("uId", "==", "crW5255058ReQgNMrQ9R3eks7Op1");//.orderBy("bookedAt", "desc")


    const [bookings] = useCollectionData(query, { idField: 'id' });

    return (
<>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Your Bookings
                </Typography>
                <List id="test" sx={{position:"center", margin: "0 auto"}}  >
                    {bookings && bookings.map(booking =>
                        <ListItem key={booking.bookedAt} divider={true} dense={true} sx={{border:0.5, textAlign: "center"}}>
                            <Grid2  container rowSpacing={1} columnSpacing={20} columns={2}>
                                <Grid2 xs={1} sx={{textAlign:"right"}}>
                                    Location
                                </Grid2>
                                <Grid2 xs={1} sx={{textAlign:"left"}}>
                                    {booking.location}
                                </Grid2>
                                <Grid2 xs={1}>
                                    Booked at
                                </Grid2>
                                <Grid2 xs={1}>
                                    {booking.bookedAt.toDate().getDate() + ". "
                                        + booking.bookedAt.toDate().getMonth() + '. '
                                        + booking.bookedAt.toDate().getFullYear() + " "
                                        + booking.bookedAt.toDate().getHours() + ":"
                                        + booking.bookedAt.toDate().getMinutes()}
                                </Grid2>
                                <Grid2 xs={1}>
                                    Rent start
                                </Grid2>
                                <Grid2 xs={1}>
                                    {booking.rentStart.toDate().getDate() + ". "
                                        + booking.rentStart.toDate().getMonth() + '. '
                                        + booking.rentStart.toDate().getFullYear() + " "
                                        + booking.rentStart.toDate().getHours() + ":"
                                        + booking.rentStart.toDate().getMinutes()}
                                </Grid2>
                                <Grid2 xs={1}>
                                    Rent end
                                </Grid2>
                                <Grid2 xs={1}>
                                    {booking.rentEnd.toDate().getDate() + ". "
                                        + booking.rentEnd.toDate().getMonth() + '. '
                                        + booking.rentEnd.toDate().getFullYear() + " "
                                        + booking.rentEnd.toDate().getHours() + ":"
                                        + booking.rentEnd.toDate().getMinutes()}
                                </Grid2>
                                <Grid2 xs={1}>
                                    Type
                                </Grid2>
                                <Grid2 xs={1}>
                                    {booking.type}
                                </Grid2>
                            </Grid2>
                            <Divider/>
                        </ListItem>
                    )}

                </List>
                </>
    )
}*/