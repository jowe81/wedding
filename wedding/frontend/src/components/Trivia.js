import Countdown from "./Countdown";
import Navigation from "./Navigation";
import './trivia.scss';

const Trivia = (appData) => {
  return (
    <div>
      <h1 className="top-header">Welcome to Our Wedding</h1>
      <Navigation {...appData}/>
      <div className="home-message padded-text-div trivia-container">
        <Countdown />      
        <br></br>
        <h5>Did you know?</h5>
        <section className="trivia-section">
          The website you are looking at is being served from a computer that Jess and Johannes built together.
        </section>
        <section>
          <img src="/trivia-assembling-computer.jpg" />
        </section>
        <section>
          The current nominal internet <b>uplink speed is 100 mpbs</b>. The production-optimized assets for this site yield a <b>total payload of 1.4 MB</b>.
          In theory this means that in the best case scenario the server can cater to about 4 new visits per second, or <b>240 new visits per minute</b>.
          Hopefully that will be sufficient!
        </section>

      </div>

    </div>
  )
}

export default Trivia;