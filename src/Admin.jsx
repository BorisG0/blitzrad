import firebase from "./firebase";
import { useCollectionData, useCollection } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";
import {
    TextField,
    Button,
    Box
} from "@mui/material";
import { useState } from "react";
import { Navigate } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";


export function Admin() {
    const [eBikePrice, setEBikePrice] = useState(null);
    const [bikePrice, setBikePrice] = useState(null);
    const [scooterPrice, setScooterPrice] = useState(null);
    const [isAllowed, setIsAllowed] = useState(true);

    const firestore = firebase.firestore();
    const auth = firebase.auth();
    const [user] = useAuthState(auth);

    const vehilcesRef = firestore.collection('vehicles');
    const query = vehilcesRef.limit(25);
    const [vehicles, loading, error] = useCollection(query, { idField: 'id' });

    const scooterRef = doc(firestore, "vehicles", "scooter");
    const bikeRef = doc(firestore, "vehicles", "bike");
    const eBikeRef = doc(firestore, "vehicles", "eBike");

    if (vehicles && scooterPrice == null && bikePrice == null && eBikePrice == null) {
        setValues();
    }
    if(user && !user.email.includes("@grabowski.com")){
        return <Navigate to="/"/>
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(scooterRef, {
                price: scooterPrice
            });
            await updateDoc(bikeRef, {
                price: bikePrice
            });
            await updateDoc(eBikeRef, {
                price: eBikePrice
            });
        } catch (error) {
            setIsAllowed(false);
            return (
                <>
                    <div> ne </div>
                </>
            )
        }

    }
    const resetValues = () => {
        setValues();
    }
    function setValues() {
        for (let i = 0; i < vehicles.docs.length; i++) {
            if (vehicles.docs[i].id == "scooter") {
                setScooterPrice(vehicles.docs[i].data().price);
            }
            if (vehicles.docs[i].id == "bike") {
                setBikePrice(vehicles.docs[i].data().price);
            }
            if (vehicles.docs[i].id == "eBike") {
                setEBikePrice(vehicles.docs[i].data().price);
            }
        }
    }
    return (
        <>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {!isAllowed && <div> Looks like you are not allowed to be here </div>}
            {vehicles && isAllowed && <>
                <h3>Prices</h3>
                <form onSubmit={handleSubmit}>
                    <TextField
                        style={{ width: "200px", margin: "5px" }}
                        type="number"
                        label="E-Bike"
                        variant="outlined"
                        value={eBikePrice}
                        onChange={(e) => setEBikePrice(e.target.value)}
                    />
                    <br />
                    <TextField
                        style={{ width: "200px", margin: "5px" }}
                        type="number"
                        label="Bike"
                        variant="outlined"
                        value={bikePrice}
                        onChange={(e) => setBikePrice(e.target.value)}
                    />
                    <br />
                    <TextField
                        style={{ width: "200px", margin: "5px" }}
                        type="number"
                        label="Scooter"
                        variant="outlined"
                        value={scooterPrice}
                        onChange={(e) => setScooterPrice(e.target.value)}
                    />
                    <br />
                    <Button type='submit' variant="contained" color="primary" style={{ margin: "5px" }}>
                        save
                    </Button>
                    <Button variant="contained" color="primary" onClick={resetValues}>
                        reset
                    </Button>
                </form>
            </>
            }
        </>
    )
}