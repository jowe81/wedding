import Live from "./Live";

const HomeAfter = (appData) => {

  return (
    <div className="home-message padded-text-div">
      We got married in Vancouver on February 18th, 2023.<br></br>Rewatch the live broadcast of the ceremony here:      
      <Live {...appData}/>
    </div>
  );

}

export default HomeAfter;