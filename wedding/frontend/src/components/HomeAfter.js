import Live from "./Live";
import { Link } from "react-router-dom";
import './home.scss';
import February18 from "./February18";

const HomeAfter = (appData) => {

  return (
    <div className="home-message padded-text-div">      
      <div>We got married in Vancouver on February 18, 2023</div>
      <div className="upload-your-pictures-note">
        Pictures are coming soon!
      </div>
            
      <div>Rewatch the live broadcast of the ceremony here:</div>
      <Live {...appData}/>
    </div>
  );

}

export default HomeAfter;