import Countdown from "./Countdown";
import GuestbookIcon from "./GuestbookIcon";

const HomeBefore = () => {

  return (
    <div className="home-message padded-text-div">
      <Countdown />
      <h4>February 18th, 2:00pm (PST)</h4>
      <br></br>
      <h5>Join us live from anywhere!</h5>
      <div className="flex">
        <div>
          On our wedding day, the live stream of the ceremony will be displayed right here. 
          The ceremony will begin at 2pm Vancouver time and the stream will become available around 1:45pm.
        </div>
        <div>          
          The guestbook will be open for contributions from February 18th to the end of February 20th.
          We'd love it if you'd sign it and let us know you followed along!
        </div>
      </div>
    </div>
  );
}

export default HomeBefore;