import Navigation from "./Navigation";

import HomeBefore from "./HomeBefore";
import HomeDuring from "./HomeDuring";
import HomeAfter from "./HomeAfter";

import Countdown from './Countdown';
import Badge from 'react-bootstrap/Badge';

import useApplicationData from "../hooks/useApplicationData";

import { useEffect } from "react";

const Home = (props) => {

  const appData = useApplicationData();
  const {status, embedId} = appData.getData();
  console.log(status);
  let content;

  if (status === appData.T_DURING) {
    content = (
      <HomeDuring />
    );
  } else if (status === appData.T_BEFORE) {
    content = (
      <HomeBefore />
    );
  } else if (status === appData.T_AFTER || status === appData.T_CLOSED) {
    content = (
      <HomeAfter />
    );
  }
   
  return (
    <div> 
      
      <h1>Welcome to Our Wedding</h1>
      <Navigation {...props} />

      { content }
      
    </div>
  )
}

export default Home;