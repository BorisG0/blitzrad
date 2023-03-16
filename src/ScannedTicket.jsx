import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import firebase from "./firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Routes, Route, useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect, useMemo } from 'react';
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { useDocument } from 'react-firebase-hooks/firestore';

const firestore = firebase.firestore();

export function ScannedTicket(){

    const { id } = useParams()

    const [value, loading, error] = useDocument(
        doc(firestore, 'bookings', id),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      );
   
    return(
        <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
        {value && <span>Document: k {JSON.stringify(value.data())}</span>}
      </p>
    </div>
  )
}