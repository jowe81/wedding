import axios from "axios";
import { useState, useEffect } from "react";

import constants from "../_constants";


export default function useApplicationData(init) {
  
  const T_API_SERVER_ROOT = constants.T_API_SERVER_ROOT;
  const T_API_SERVER_URL = `${T_API_SERVER_ROOT}api/`;
  const T_API_SERVER_IMAGES = `${T_API_SERVER_ROOT}images/`;

  const T_DEFAULT_EMBED_ID = constants.T_DEFAULT_EMBED_ID; //default

  const T_BEFORE = 'before';
  const T_PREROLL = 'preroll';
  const T_DURING = 'during';
  const T_AFTER = 'after';
  const T_CLOSED = 'closed';

  // For testing:
  const statusOverride = [null, T_BEFORE, T_PREROLL, T_DURING, T_AFTER, T_CLOSED][2];

  // const T_DATE_SWITCH_TO_PREROLL = new Date("2023-02-10T02:11:00.000+00:00");
  // const T_DATE_SWITCH_TO_DURING =  new Date("2023-02-10T02:11:00.000+00:00");
  // const T_DATE_SWITCH_TO_AFTER  =  new Date("2023-02-10T02:13:00.000+00:00");
  // const T_DATE_SWITCH_TO_CLOSED =  new Date("2023-02-10T02:14:00.000+00:00");    
  

  //Actuals:
  const T_DATE_SWITCH_TO_PREROLL = new Date("2023-02-18T21:30:00.000+00:00");
  const T_DATE_SWITCH_TO_DURING  = new Date("2023-02-18T21:55:00.000+00:00");
  const T_DATE_SWITCH_TO_AFTER   = new Date("2023-02-18T23:45:00.000+00:00");
  const T_DATE_SWITCH_TO_CLOSED  = new Date("2023-02-20T08:00:00.000+00:00");
  
  const displaySchedule = () => {
    console.log('App is starting...');
    console.log('Switching to preroll: ', T_DATE_SWITCH_TO_PREROLL.toLocaleString());
    console.log('Switching to during:  ', T_DATE_SWITCH_TO_DURING.toLocaleString());
    console.log('Switching to after:   ', T_DATE_SWITCH_TO_AFTER.toLocaleString());
    console.log('Switching to closed:  ', T_DATE_SWITCH_TO_CLOSED.toLocaleString());  
  }
  
  const [embedId, setEmbedId] = useState(T_DEFAULT_EMBED_ID);

  const retrieveEmbedId = () => {
    return axios
      .get(T_API_SERVER_URL + "embed-id")
      .then(res => {        
        const newEmbedId = res.data?.embedid;        
        if (newEmbedId) {        
          console.log('Server: ', newEmbedId);  
          setEmbedId(newEmbedId);          
        } else {
          console.warn('Received empty embedId from server.');
        }
      })
      .catch(err => console.warn(err));
  };


  
  //Initialization
  useEffect(() => {
    if (init) {
      displaySchedule();

      //Retrieve embed ID instantly on load
      retrieveEmbedId();

      //Set a timer to check periodically
      const clear = setInterval(retrieveEmbedId, 60000); //Once a minute
      return () => { clearInterval(clear)};  
    }
  }, []);

  const getStatus = () => {

    //For testing
    if (statusOverride) {
      return statusOverride;
    }

    let status;

    let now = new Date();

    if (now < T_DATE_SWITCH_TO_PREROLL) {
      //Remain on the countdown view until 1:45pm on Feb 18
      status = T_BEFORE;
    } else if (now < T_DATE_SWITCH_TO_DURING) {
      //Switch to the live stream view at 1:45pm on Feb 18
      status = T_PREROLL;
    } else if (now < T_DATE_SWITCH_TO_AFTER) {
      //Preroll ends at 2:00pm on Feb 18
      status = T_DURING;
    } else if (now < T_DATE_SWITCH_TO_CLOSED) {
      //Switch to "view the recording" at 4pm on Feb 18
      status = T_AFTER;
    } else {
      //Guestbook closes at 12am on Feb 21
      status = T_CLOSED;
    }
    
    return status;
  }
      
  const isGuestbookOpen = () => {
    const status = getStatus();    
    return [T_PREROLL, T_DURING, T_AFTER].includes(status);
  }
  
  const isAutoplayEnabled = () => {
    const status = getStatus();    
    return [T_DURING, T_PREROLL].includes(status);
  }

  const getData = () => {
    return {
      status: getStatus(),
      guestbookOpen: isGuestbookOpen(),
      autoplay: isAutoplayEnabled(),
      embedId,
    }
  }

  return {
    getData,    
    T_BEFORE,
    T_PREROLL,
    T_DURING,
    T_AFTER,
    T_CLOSED,

    T_DEFAULT_EMBED_ID,

    T_API_SERVER_URL,
    T_API_SERVER_IMAGES,
  }
  
}