import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import firebase from "./firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Routes, Route, useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect, useMemo } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { getNiceDate } from "./Account"

const firestore = firebase.firestore();

export function ScannedTicket() {

  const { id } = useParams()
  
  const [value, loading, error] = useDocument(
    doc(firestore, 'bookings', id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Document: Loading...</span>}
      {value &&
        <>
          <Card sx={{ minWidth: 275 }} style={{backgroundColor:"#cde2ff"}}>
            <CardContent>
              <Typography variant="h4">
                Scanned Booking
              </Typography>
              <Typography sx={{ mb: 1.5 }} >
                Location: {value.data().location}
              </Typography>
              <Typography sx={{ mb: 1.5 }} >
                Booked at: {getNiceDate(value.data().rentStart, true)}
              </Typography>
              <Typography sx={{ mb: 1.5 }} >
                Start date: {getNiceDate(value.data().rentStart, false)}
              </Typography>
              <Typography sx={{ mb: 1.5 }} >
                End date: {getNiceDate(value.data().rentEnd, false)}
              </Typography>
              <Typography sx={{ mb: 1.5 }} >
                Type: {value.data().type}
              </Typography>
              <Typography sx={{ mb: 1.5 }} >
                Price: {value.data().pricePaid},00€
              </Typography>
            </CardContent>
          </Card>
        </>
      }
    </div>
  )
}