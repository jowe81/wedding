import Live from "./Live";

const HomeDuring = () => {

  return (
      <div className="home-message padded-text-div">
        <h5>We are live!</h5>
        <small className="text-secondary">Note: You may have to unmute the video.</small>
        <Live />
      </div>    
  );
}

export default HomeDuring;