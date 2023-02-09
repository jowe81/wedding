import Navigation from "./Navigation";

import HomeBefore from "./HomeBefore";
import HomeDuring from "./HomeDuring";
import HomeAfter from "./HomeAfter";

import useApplicationData from "../hooks/useApplicationData";

const Home = () => {

  const appData = useApplicationData();
  const {status, embedId} = appData.getData();

  console.log('Current state: ', status);

  let content;

  if (status === appData.T_PREROLL || status === appData.T_DURING) {
    content = (
      <HomeDuring />
    );
  } else if (status === appData.T_BEFORE) {
    content = (
      <HomeBefore />
    );
  } else if (status === appData.T_AFTER || status === appData.T_CLOSED) {
    content = (
      <HomeAfter />
    );
  }
   
  return (
    <div> 
      
      <h1 className="top-header">Welcome to Our Wedding</h1>
      <Navigation />

      { content }
      
    </div>
  )
}

export default Home;