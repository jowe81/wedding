import React, { useEffect, useState } from "react";

import useApplicationData from "./hooks/useApplicationData";
import useForceUpdate from "./hooks/useForceUpdate";

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


function App() {

  const appData = useApplicationData();
  const props = appData.getData();

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    setInterval(forceUpdate, 5000);
  }, []);
  
  useEffect(() => {
    document.title = "jowe.ca";  
  }, []);
  
  return (
    <div className="App">
      <img className="header_image" src={HeaderImage}/>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="guestbook" element={ <Guestbook /> } />
        <Route path="sign" element={ <Sign /> } />

        <Route path=".update-embed-id" element={ <UpdateEmbedId /> } />
      </Routes>
      <div className="overlay"></div>
      
    </div>    
  );
}

export default App;
