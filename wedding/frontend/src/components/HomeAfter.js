import Live from "./Live";
import useApplicationData from "../hooks/useApplicationData";

const HomeAfter = () => {
  const appData = useApplicationData();

  return (
    <div className="home-message padded-text-div">
      We got married in Vancouver on February 18th, 2023.<br></br>Rewatch the live broadcast of the ceremony here:      
      <Live />
    </div>
  );

}

export default HomeAfter;