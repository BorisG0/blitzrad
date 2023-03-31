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
import { maxHeight } from "@mui/system";


export function Admin() {
    const [eBikeBasePrice, setEBikeBasePrice] = useState(null);
    const [bikeBasePrice, setBikeBasePrice] = useState(null);
    const [scooterBasePrice, setScooterBasePrice] = useState(null);
    const [eBikeDayPrice, setEBikeDayPrice] = useState(null);
    const [bikeDayPrice, setBikeDayPrice] = useState(null);
    const [scooterDayPrice, setScooterDayPrice] = useState(null);
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

    if (prices && scooterBasePrice == null) {
        setBaseValues();
        setDayValues();
    }
    if (user && !user.email.includes("@grabowski.com")) {
        return <Navigate to="/" />
    }
    const handleBaseSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(scooterRef, {
                basePrice: scooterBasePrice
            });
            await updateDoc(bikeRef, {
                basePrice: bikeBasePrice
            });
            await updateDoc(eBikeRef, {
                basePrice: eBikeBasePrice
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
    const handleDaySubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(scooterRef, {
                pricePerDay: scooterDayPrice
            });
            await updateDoc(bikeRef, {
                pricePerDay: bikeDayPrice
            });
            await updateDoc(eBikeRef, {
                pricePerDay: eBikeDayPrice
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
    const resetBaseValues = () => {
        setBaseValues();
    }
    const resetDayValues = () => {
        setDayValues();
    }
    function setBaseValues() {
        for (let i = 0; i < prices.length; i++) {
            if (prices[i].type == "Scooter") {

                setScooterBasePrice(prices[i].basePrice);
            }
            if (prices[i].type == "Bike") {
                setBikeBasePrice(prices[i].basePrice);
            }
            if (prices[i].type == "E-Bike") {
                setEBikeBasePrice(prices[i].basePrice);
            }
        }
    }
    function setDayValues() {
        for (let i = 0; i < prices.length; i++) {
            if (prices[i].type == "Scooter") {

                setScooterDayPrice(prices[i].pricePerDay);
            }
            if (prices[i].type == "Bike") {
                setBikeDayPrice(prices[i].pricePerDay);
            }
            if (prices[i].type == "E-Bike") {
                setEBikeDayPrice(prices[i].pricePerDay);
            }
        }
    }
    return (
        <>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {!isAllowed && <div> Looks like you are not allowed to be here </div>}
            {prices && isAllowed && <>
                <h1>Prices</h1>
                <div style={{maxWidth: "700px", margin: "auto"}}>
                <Grid2 container >

                    <Grid2 xs={12} md={6}  >
                        <h2> Base Price</h2>
                        <form onSubmit={handleBaseSubmit}>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="number"
                                label="E-Bike"
                                variant="outlined"
                                value={eBikeBasePrice}
                                onChange={(e) => setEBikeBasePrice(e.target.value)}
                            />
                            <br />
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="number"
                                label="Bike"
                                variant="outlined"
                                value={bikeBasePrice}
                                onChange={(e) => setBikeBasePrice(e.target.value)}
                            />
                            <br />
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="number"
                                label="Scooter"
                                variant="outlined"
                                value={scooterBasePrice}
                                onChange={(e) => setScooterBasePrice(e.target.value)}
                            />
                            <br />
                            <Button type='submit' variant="contained" color="primary" style={{ margin: "5px" }}>
                                save
                            </Button>
                            <Button variant="contained" color="primary" onClick={resetBaseValues}>
                                reset
                            </Button>
                        </form>
                    </Grid2>
                    <Grid2 xs={12} md={6}  >
                        <h2> Day Price</h2>
                        <form onSubmit={handleDaySubmit}>
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="number"
                                label="E-Bike"
                                variant="outlined"
                                value={eBikeDayPrice}
                                onChange={(e) => setEBikeDayPrice(e.target.value)}
                            />
                            <br />
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="number"
                                label="Bike"
                                variant="outlined"
                                value={bikeDayPrice}
                                onChange={(e) => setBikeDayPrice(e.target.value)}
                            />
                            <br />
                            <TextField
                                style={{ width: "200px", margin: "5px" }}
                                type="number"
                                label="Scooter"
                                variant="outlined"
                                value={scooterDayPrice}
                                onChange={(e) => setScooterDayPrice(e.target.value)}
                            />
                            <br />
                            <Button type='submit' variant="contained" color="primary" style={{ margin: "5px" }}>
                                save
                            </Button>
                            <Button variant="contained" color="primary" onClick={resetDayValues}>
                                reset
                            </Button>
                        </form>
                    </Grid2>

                </Grid2 >
                </div>


            </>
            }
        </>
    )
}