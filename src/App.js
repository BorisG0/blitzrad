import './App.css';

import { RegionSelection } from './RegionSelection';
import { MainView } from './mainView';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './NavBar';
import { AboutUs } from './AboutUs';
import { Account } from './Account';
import { ScannedTicket } from './ScannedTicket';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Admin } from './Admin';


function App() {

  return (
    <>
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <NavBar/>
        <Routes>
            <Route path="/" element={<MainView/>} />
            <Route path="/region" element={<RegionSelection />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/account" element={<Account />} />
            <Route path="/scanned/:id" element={<ScannedTicket/>}/>
            <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </LocalizationProvider>
      
      </div>
    </>
  );
}



export default App;
