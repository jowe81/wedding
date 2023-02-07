import Live from "./Live";
import MessageBefore from "./MessageBefore";
import Navigation from "./Navigation";
import Countdown from './Countdown';


const Home = (props) => {

  const isDayOf = false;

  let content;

  if (isDayOf) {

  } else {
    content = (
      <div>
        <Countdown />
        <MessageBefore />
      </div>
    );
  }
   
  return (
    <div>
      
      <h1>Welcome to Our Wedding</h1>
      <Navigation />

      { content }
      
    </div>
  )
}

export default Home;