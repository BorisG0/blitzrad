import * as React from 'react';
import {MapScreen} from './MapScreen'
import {LocationSelection } from './LocationSelection';

export function MainView(){
    const [selectedLocation, setSelectedLocation] = React.useState(1);

    const handleLocationClick = (event, name) => {
        if(selectedLocation == name){
            setSelectedLocation(null)
        }else{
            setSelectedLocation(name);
        }
    }

    return(

        <div id="bodyMainView" className="Map-parent">
          <LocationSelection handleLocationClick={handleLocationClick} selectedLocation={selectedLocation} className="Region-selection"/>
          <MapScreen className="Map-screen" clickEvent={handleLocationClick}/>
        </div>

    )
}