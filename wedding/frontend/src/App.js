import React, { useEffect, useState } from "react";

import useApplicationData from "./hooks/useApplicationData";

import "./App.scss";
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home";
import Guestbook from "./components/Guestbook";
import Sign from "./components/Sign";
import UpdateEmbedId from "./components/UpdateEmbedId";
import HeaderImage from "./img/jlb-jmw.png";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import SittingOnLog from "./components/SittingOnLog";

function App() {

  const appData = useApplicationData(true);

  const [prevStatus, setPrevStatus] = useState(appData.getData().status);
    
  useEffect(() => {
    console.log('Setting up status checker (app).');

    const clear = setInterval(() => {
      const newStatus = appData.getData().status
      console.log('Updating status: ', newStatus);
      setPrevStatus(newStatus);
    }, appData.CHECK_FOR_STATUS_INTERVAL_MS);

    return () => clearInterval(clear);
  }, [])

  
  return (
    <div className="App">
      <img className="header_image" src={HeaderImage}/>
      <Routes>
        <Route path="/" element={ <Home {...appData}/> } />
        <Route path="guestbook" element={ <Guestbook {...appData}/> } />
        <Route path="sign" element={ <Sign {...appData}/> } />

        <Route path=".update-embed-id" element={ <UpdateEmbedId {...appData}/> } />
      </Routes>      
      <SittingOnLog />
    </div>    
  );
}

export default App;
