import Live from "./Live";
import MessageBefore from "./MessageBefore";
import Navigation from "./Navigation";

const Home = (props) => {

  const isDayOf = false;






  return (
    <div>
      
      <h1>Welcome to Our Wedding</h1>
      <Navigation />
      { isDayOf && <Live embedId="A4lD6UPvdsY" /> }
      { !isDayOf && <MessageBefore /> }
      
    </div>
  )
}

export default Home;