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
          The website you are looking at is being served from a computer in Johannes' apartment that the two of them built together.
          <img src="/trivia-assembling-computer.jpg" />
        </section>
        <section>
          Jess is a prospector. She hits rocks for a living.
        </section>
        <section>
          Johannes is an emigrant from Germany who has lived in British Columbia for the last 15 years.        
        </section>
        <section>
          Both in their early 40s, neither Johannes nor Jess have children or previously been married.
        </section>
        <section>
          Jess and Johannes first met in person about 90 minutes after an initial chat on an online dating platform.
        </section>        
        <section>
          Jess is the oldest of has six children, five of which are girls.
        </section>
        <section>
          The team that is bringing the broadcast to you are volunteers who joined the production department at Tenth Church during Johannes' tenure.
        </section>
        <section>
          Jess and Johannes are both renting a suite for $950 (the exact same price!) in the city of Vancouver. That's an unheard-of, amazing deal. I they were to add their rents together, they'd still be shy of the average rental price for a one-bedroom apartment by $800 (it's $2,600 now!).
        </section>

      </div>

    </div>
  )
}

export default Trivia;