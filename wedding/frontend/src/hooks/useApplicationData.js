//import axios from "axios";
import { useState } from "react";

export default function useApplicationData(initialState) {
  
  const T_EMBED_ID = '_S0zBdl9gc4';

  const T_BEFORE = 'before';
  const T_DURING = 'during';
  const T_AFTER = 'after';
  const T_CLOSED = 'closed';
  

  const getStatus = () => {
    let status;

    let now = new Date();

    if (now < new Date("2023-02-18T22:45:00.000+00:00")) {
      //Remain on the countdown view until 1:45pm on Feb 18
      status = T_BEFORE;
    } else if (now < new Date("2023-02-19T01:00:00.000+00:00")) {
      //Switch to the live stream view at 1:45pm on Feb 18
      status = T_DURING;
    } else if (now < new Date("2023-02-20T09:00:00.000+00:00")) {
      //Switch to "view the recording" at 4pm on Feb 18
      status = T_AFTER;
    } else if (now < new Date("2023-02-21T09:00:00.000+00:00")) {
      //Guestbook closes at 12am on Feb 21
      status = T_CLOSED;
    }

    console.log('Setting status:', status);    

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
      embedId: T_EMBED_ID,
      autoplay: isAutoplayEnabled()
    }
  }

  return {
    getData,
    guestbookOpen: isGuestbookOpen(),   
    T_BEFORE,
    T_DURING,
    T_AFTER,
    T_CLOSED,
  }
  
}