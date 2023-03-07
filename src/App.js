import './App.css';

import { RegionSelection } from './RegionSelection';
import { MainView } from './mainView';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './NavBar';
import { AboutUs } from './AboutUs';
import { Account } from './Account';
import { Payment } from './Payment';


function App() {

  return (
    <>
    <div className="App">
      <NavBar/>
       <Routes>
          <Route path="/" element={<MainView/>} />
          <Route path="/region" element={<RegionSelection />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/account" element={<Account />} />
          <Route path="/payment" element={<Payment />} />


       </Routes>
      </div>
    </>
  );
}



export default App;
