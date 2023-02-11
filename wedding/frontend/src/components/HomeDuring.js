import Live from "./Live";

const HomeDuring = (appData) => {
  const { status } = appData.getData();

  return (
      <div className="home-message padded-text-div">        
        <h5>We are {(status === appData.T_PREROLL) && 'about to go'} live!</h5>
        <small className="text-secondary">Note: You may need to unmute the video.</small>
        <Live {...appData}/>        
      </div>    
  );
}

export default HomeDuring;