//import axios from "axios";
import { useState } from "react";

export default function useApplicationData(initialState) {
  
  const T_EMBED_ID = '_S0zBdl9gc4';

  const T_BEFORE = 'before';
  const T_DURING = 'during';
  const T_AFTER = 'after';
  

  const getStatus = () => {
    let status;

    let now = new Date();

    if (false && now < new Date("2023-02-18T09:00:00.000+00:00")) {
      status = T_BEFORE;
    } else if (now < new Date( "2023-02-19T01:00:00.000+00:00")) {
      status = T_DURING;
    } else if (now < new Date( "2023-02-20T09:00:00.000+00:00")) {
      status = T_AFTER;
    }

    console.log('Setting status:', status);

    return status;
  }
  
  const isGuestbookOpen = () => {

    const status = getStatus();

    if (status !== T_BEFORE) {
      //Guestbook has opened - but is it stil open?    
      let closingDate = new Date( "2023-02-21T09:00:00.000+00:00");
      let now = new Date();
  
      console.log("Guestbook closes", closingDate, "- closed yet?", now < closingDate);
      return now < closingDate;
  
    } else {
      //Not open yet
      return false;
    }
  }
  
  const getData = () => {
    return {
      status: getStatus(),
      guestbookOpen: isGuestbookOpen(),
      embedId: T_EMBED_ID,
    }
  }

  return {
    getData,
    T_BEFORE,
    T_DURING,
    T_AFTER,
  }
  
}