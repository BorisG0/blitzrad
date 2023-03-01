import {List, ListItem, ListItemText } from '@mui/material';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getDistance } from 'geolib';
import firestore from "./firebase"

export function LocationSelection(){
    const locationsRef = firestore.collection('locations');
    const query = locationsRef.limit(25);
    const [locations] = useCollectionData(query, {idField: 'id'});

    return(
        <div>
            <h2>Location Selection</h2>
            <List>
                {locations && locations.map(l => <LocationDisplay key={l.name} loc={l} />)}
            </List>
        </div>
    )
  }

  function LocationDisplay(props){
    const userPosition = {lat:49.48, lng: 8.47}

    const {id ,name, location} = props.loc;
    const pos = {lat: location._lat,lng: location._long}
    const dist = getDistance(userPosition, pos);
    console.log("location:", location, " name:",name)
    console.log("dist: ", dist)
  
    return (
        <ListItem button>
            <ListItemText  secondaryTypographyProps={{ sx: { color: "white" } }}
             primary={name} secondary={"📍 "+dist+"m"}/>
        </ListItem>
    )
  }