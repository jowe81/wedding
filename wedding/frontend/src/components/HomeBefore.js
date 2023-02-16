import Countdown from "./Countdown";
import February18 from "./February18";

const HomeBefore = (appData) => {

  const from = new Date(appData.T_DATE_SWITCH_TO_PREROLL).toLocaleDateString('en-US', appData.DATE_FORMAT);
  const until = new Date(appData.T_DATE_SWITCH_TO_CLOSED).toLocaleDateString('en-US', appData.DATE_FORMAT)

  return (
    <div className="home-message padded-text-div">
      <Countdown />      
      <February18 />
      <br></br>
      <h5>Join us live from anywhere!</h5>
      <div className="flex">
        <div>
          <h6>Live Broadcast</h6>
          <p>
            On our wedding day, <b>a live stream of the ceremony</b> will be displayed right here. 
            The ceremony will begin at 2pm Vancouver time and the stream will become available 
            around 1:40pm and will feature pre-service content.
          </p>
          <p>
            If you are unsure of the start time in your timezone, check <a href="https://www.timeanddate.com/worldclock/converter.html?iso=20230218T220000&p1=256" target="_blank">click here</a> to find out.
          </p>
        </div>
        <div>          
          <h6>Guestbook</h6>
          <p>
            The guestbook will be open for contributions from { from } to { until }.
            We'd love it if you'd sign it and let us know you followed along!
          </p>
        </div>
      </div>      
    </div>
  );
}

export default HomeBefore;