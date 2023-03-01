import {MapScreen} from './MapScreen'
import {LocationSelection } from './LocationSelection';

export function MainView(){
    return(
        <section>
        <div id="bodyMainView" className="Map-parent">
          <LocationSelection className="Region-selection"/>
          <MapScreen className="Map-screen" />
        </div>
        </section>
    )
}