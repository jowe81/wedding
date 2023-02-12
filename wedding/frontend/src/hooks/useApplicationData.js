import axios from "axios";
import { useState, useEffect } from "react";

import constants from "../_constants";


export default function useApplicationData(init) {
  
  const {
    T_API_SERVER_ROOT,
    T_DEFAULT_EMBED_ID,

    T_DATE_SWITCH_TO_PREROLL,
    T_DATE_SWITCH_TO_DURING,
    T_DATE_SWITCH_TO_AFTER,
    T_DATE_SWITCH_TO_CLOSED,

    CHECK_FOR_STATUS_INTERVAL_MS,
    QUERY_EMBED_ID_INTERVAL_MS,
  } = constants;

  const T_API_SERVER_URL = `${T_API_SERVER_ROOT}api/`;
  const T_API_SERVER_IMAGES = `${T_API_SERVER_ROOT}images/`;

  const T_BEFORE = 'before';
  const T_PREROLL = 'preroll';
  const T_DURING = 'during';
  const T_AFTER = 'after';
  const T_CLOSED = 'closed';

  // For testing:
  const statusOverride = [null, T_BEFORE, T_PREROLL, T_DURING, T_AFTER, T_CLOSED][0];
  
  const displaySchedule = () => {
    console.log('App is starting...');
    console.log('Switching to preroll: ', T_DATE_SWITCH_TO_PREROLL.toLocaleString());
    console.log('Switching to during:  ', T_DATE_SWITCH_TO_DURING.toLocaleString());
    console.log('Switching to after:   ', T_DATE_SWITCH_TO_AFTER.toLocaleString());
    console.log('Switching to closed:  ', T_DATE_SWITCH_TO_CLOSED.toLocaleString());  
    console.log('Status-Check interval (ms):  ', CHECK_FOR_STATUS_INTERVAL_MS);
    console.log('Query EmbedId interval (ms): ', QUERY_EMBED_ID_INTERVAL_MS);
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
      const clear = setInterval(retrieveEmbedId, QUERY_EMBED_ID_INTERVAL_MS);
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

    CHECK_FOR_STATUS_INTERVAL_MS,    
    QUERY_EMBED_ID_INTERVAL_MS,
  }
  
}