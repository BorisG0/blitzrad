import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import React, { useState, useRef, useEffect } from "react";
import icon from 'leaflet/dist/images/marker-icon.png';
import testIcon from "./images/bicycle.png";
import "leaflet/dist/leaflet.css" 
import L from "leaflet"
import firestore from "./firebase"
import { useCollectionData } from 'react-firebase-hooks/firestore';

export function MapScreen(props){
    const bikeIcon = new L.icon({
        iconUrl: testIcon,
        //iconUrl: icon,
        iconSize: [100,100],
      });
      const userPosition = {lat:49.48, lng: 8.47}
    const userIcon = new L.icon({
    iconUrl: icon,
    iconSize: [35, 45]
})

    const [center, setCenter] = useState({ lat:49.479038, lng:8.470520});
    const ZOOM_LEVEL = 14;
    const mapRef = useRef()

    useEffect(() => {
      const unsubscribe = firestore
        .collection("locations")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLocations(data);
        });
    
      return unsubscribe;
    }, []);

    const [locations, setLocations] = useState([]);

    return(
      <MapContainer 
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
      >
        <TileLayer url="https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=p6caGMw9wAWLQ1WY2WIh"
        attribution='https://api.maptiler.com/maps/openstreetmap/256/tiles.json?key=p6caGMw9wAWLQ1WY2WIh'
        />

         {locations.map((location) => (
            <Marker key={location.id} position={[location.location.latitude, location.location.longitude]} icon={bikeIcon}
            eventHandlers={{
              click: (event) => props.clickEvent(event, location.name),
            }}>
              <Popup>{location.name}</Popup>
            </Marker>
          ))}

        <Marker position={userPosition} icon={userIcon}>
            <Popup>
                You are here
            </Popup>
        </Marker>
      </MapContainer>
    )
  }