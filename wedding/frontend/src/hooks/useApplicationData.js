import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData(initialState) {
  
//  const T_API_SERVER_URL = "http://localhost";
  const T_API_SERVER_URL = "https://jowe.ddns.net:10001";

  const T_DEFAULT_EMBED_ID = 'PogK0wZLFiQ'; //default

  const T_BEFORE = 'before';
  const T_PREROLL = 'preroll';
  const T_DURING = 'during';
  const T_AFTER = 'after';
  const T_CLOSED = 'closed';

  // For testing:
  const statusOverride = [null, T_BEFORE, T_PREROLL, T_DURING, T_AFTER, T_CLOSED][0];

  // const T_DATE_SWITCH_TO_PREROLL = new Date("2023-02-10T02:11:00.000+00:00");
  // const T_DATE_SWITCH_TO_DURING =  new Date("2023-02-10T02:11:00.000+00:00");
  // const T_DATE_SWITCH_TO_AFTER  =  new Date("2023-02-10T02:13:00.000+00:00");
  // const T_DATE_SWITCH_TO_CLOSED =  new Date("2023-02-10T02:14:00.000+00:00");    
  // const PREROLL_MINUTES = 1;


  //Actuals:
  const PREROLL_MINUTES = 15;
  const T_DATE_SWITCH_TO_PREROLL = new Date("2023-02-18T21:45:00.000+00:00");
  const T_DATE_SWITCH_TO_DURING  = new Date("2023-02-18T22:00:00.000+00:00");
  const T_DATE_SWITCH_TO_AFTER   = new Date("2023-02-18T23:45:00.000+00:00");
  const T_DATE_SWITCH_TO_CLOSED  = new Date("2023-02-20T08:00:00.000+00:00");
  


  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);  
  }

  const T_DATE_PREOLL_ENDS = addMinutes(T_DATE_SWITCH_TO_DURING, PREROLL_MINUTES);

  const [embedId, setEmbedId] = useState(T_DEFAULT_EMBED_ID);

  const retrieveEmbedId = () => {
    return axios
      .get(T_API_SERVER_URL + "/api/embed-id")
      .then(res => {
        const newEmbedId = res.data?.embedid;

        if (newEmbedId && (newEmbedId !== embedId)) {
          //EmbedId changed - update.
          console.log('Received new Embed Id:', newEmbedId);
          setEmbedId(res.data?.embedid);        
        } else {
          //EmbedId didn't change or was removed - ignore that.
          if (newEmbedId) {
            console.log('Confirmed Embed Id: ', newEmbedId);
          } else {
            console.warn('Received Empty Embed Id', newEmbedId);
          }
        }
      })
      .catch(err => console.warn(err));
  };


  //Retrieve instantly on load
  useEffect(retrieveEmbedId, []);

  //Set timer to periodically check for updates
  useEffect(() => {
    const clear = setInterval(retrieveEmbedId, 60000); //Once a minute
    return () => { clearInterval(clear)};
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
    return [T_DURING, T_AFTER].includes(status);
  }
  
  const isAutoplayEnabled = () => {
    const status = getStatus();    
    return status === T_DURING;
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

    T_API_SERVER_URL,
  }
  
}