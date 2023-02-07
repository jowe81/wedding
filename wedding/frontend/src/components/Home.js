import Live from "./Live";
import MessageBefore from "./MessageBefore";
import Navigation from "./Navigation";
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
      <div>
        <h5>We are live!</h5>
        <small className="text-secondary">Note: You will have to unmute the video.</small>
        <Live embedId={ embedId }/>
        <p>
          
          The wedding ceremony is brought to you live by this amazing team:

        </p>
        Kate Horodyski, Live Video Director |
        Jasna Stojanovic, Broadcast Camera Operator |
        Adrian Chung, Broadcast Camera Operator |
        Raymond Lew, Broadcast Camera Operator (PTZ cameras) |
        Kevin Chow, Broadcast Camera Operator (Handheld) |

        Boris Chung, Broadcast Audio / Media Operator |
        Lorraine Ma, Front of House Media Operator |

        Brad Danyluk, Front of House Audio Engineer |
        Lucas Swaddling, Technical Director
      </div>
    )
  } else if (status ===appData.T_BEFORE) {
    content = (
      <div>
        <Countdown />
        <MessageBefore />
        <div className="linkBtn">
          <a href="https://www.weddingwire.ca/web/jessica-bjorkman-and-johannes-weber">
            <Badge bg="secondary" style={{minWidth:110 + 'px'}}>More information about the wedding...</Badge>
          </a>
        </div>

      </div>
    );
  } else if (status ===appData.T_AFTER) {
    content = (
      <div>
        We got married in Vancouver on February 18th, 2023.<br></br>Rewatch the live broadcast of the ceremony here:
        
        <Live { ...props }/>
      </div>
    )
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