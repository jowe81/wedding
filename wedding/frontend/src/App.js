import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import axios from "axios";
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home";
import Guestbook from "./components/Guestbook";
import Sign from "./components/Sign";
import HeaderImage from "./img/jlb-jmw.png";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  const [message, setMessage] = useState();
  useEffect(() => {
    fetch("/api/")
      .then(res => res.json())
      .then(res => setMessage(res.message))
      .catch(console.error);
  }, [setMessage]);

  useEffect(() => {
    document.title = "jowe.ca";  
  }, []);
  
  return (
    <div className="App">
      <img className="header_image" src={HeaderImage}/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="guestbook" element={ <Guestbook/> } />
        <Route path="sign" element={ <Sign/> } />
      </Routes>
      <div className="overlay"></div>
      
    </div>    
  );
}

export default App;
