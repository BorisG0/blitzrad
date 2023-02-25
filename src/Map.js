import React, { useState, useRef } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css" 
import L from "leaflet"
//import { required } from 'yargs';
import icon from 'leaflet/dist/images/marker-icon.png';

import { TextField } from '@mui/material';

const bikeIcon = new L.icon({
  //iconUrl: "bicycle.png",
  iconUrl: icon,

  iconSize: [35,45],
});

export function MapScreen(){
    const [center, setCenter] = useState({ lat:49.479038, lng:8.470520});
    const ZOOM_LEVEL = 14;
    const mapRef = useRef()
    const firstMarkerPosition = {lat:49.48, lng: 8.47}
    return(
      <>
      test2
      <MapContainer 
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
      >
        <TileLayer url="https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=p6caGMw9wAWLQ1WY2WIh"
        attribution='https://api.maptiler.com/maps/openstreetmap/256/tiles.json?key=p6caGMw9wAWLQ1WY2WIh'
        />
        <Marker position={firstMarkerPosition} icon={bikeIcon}>
          <Popup>
            Here are 5 vehicles available.
          </Popup>
        </Marker>
      </MapContainer>
      </>
    )
}

export function RegionSelection(){
    return(
      <>
      test
        <TextField id="outlined-basic" label="Ort" variant="outlined" />
      </>
    )
  }