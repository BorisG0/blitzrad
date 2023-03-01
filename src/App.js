import './App.css';

import { RegionSelection } from './RegionSelection';
import { MainView } from './mainView';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './NavBar';
import { AboutUs } from './AboutUs';


function App() {

  return (
    <>
    <div className="App">
      <NavBar/>
       <Routes>
          <Route path="/" element={<MainView/>} />
          <Route path="/region" element={<RegionSelection />} />
          <Route path="/aboutus" element={<AboutUs />} />
       </Routes>
      </div>
    </>
  );
}



export default App;
