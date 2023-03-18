import * as React from 'react';
import {MapScreen} from './MapScreen'
import {LocationSelection } from './LocationSelection';

export function MainView(){
    const [selectedLocation, setSelectedLocation] = React.useState(1);

    const handleLocationClick = (event, name) => {
      //setSelectedLocation(name);
        if(selectedLocation == name){
            setSelectedLocation(null)
        }else{
            setSelectedLocation(name);
        }
    }

    return(

        <div id="bodyMainView" className="Map-parent">
            <div className="Location-selection">
                <LocationSelection handleLocationClick={handleLocationClick} selectedLocation={selectedLocation} />
            </div>
            <MapScreen className="Map-screen" clickEvent={handleLocationClick}/>
        </div>

    )
}