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
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2


export function Admin() {
    const [eBikePrice, setEBikePrice] = useState(null);
    const [bikePrice, setBikePrice] = useState(null);
    const [scooterPrice, setScooterPrice] = useState(null);
    const [isAllowed, setIsAllowed] = useState(true);

    const firestore = firebase.firestore();
    const auth = firebase.auth();
    const [user] = useAuthState(auth);

    const pricesRef = firestore.collection('pricing');
    const query = pricesRef.limit(25);
    const [prices, loading, error] = useCollectionData(query, { idField: 'id' });

    const scooterRef = doc(firestore, "pricing", "UjgaUU4ReJ4dvRvZdQwJ");//scooter
    const bikeRef = doc(firestore, "pricing", "VzLXRDeAshGMursG1W0o");//bike
    const eBikeRef = doc(firestore, "pricing", "JpJ0w6lAbC16iZutkr9v");//eBike

    if (prices && scooterPrice == null && bikePrice == null && eBikePrice == null) {
        setValues();
    }
    if (user && !user.email.includes("@grabowski.com")) {
        return <Navigate to="/" />
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(scooterRef, {
                basePrice: scooterPrice
            });
            await updateDoc(bikeRef, {
                basePrice: bikePrice
            });
            await updateDoc(eBikeRef, {
                basePrice: eBikePrice
            });
        } catch (error) {
            setIsAllowed(false);
            return (
                <>
                    <div> Error </div>
                </>
            )
        }

    }
    const resetValues = () => {
        setValues();
    }
    function setValues() {
        for (let i = 0; i < prices.length; i++) {
            console.log(prices[i].type)
            if (prices[i].type == "Scooter") {

                setScooterPrice(prices[i].basePrice);
            }
            if (prices[i].type == "Bike") {
                setBikePrice(prices[i].basePrice);
            }
            if (prices[i].type == "E-Bike") {
                setEBikePrice(prices[i].basePrice);
            }
        }
    }
    return (
        <>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {!isAllowed && <div> Looks like you are not allowed to be here </div>}
            {prices && isAllowed && <>
                <h3>Prices</h3>
                <Grid2 container >
                    <Grid2 xs={2}  >
                    </Grid2>
                    <Grid2 xs={4}  >
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
                    </Grid2>
                    <Grid2 xs={4}  >
                        anderer preis
                    </Grid2>
                    <Grid2 xs={2}  >
</Grid2>
                </Grid2 >

                
            </>
            }
        </>
    )
}