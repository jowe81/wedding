import Navigation from "./Navigation";

import HomeBefore from "./HomeBefore";
import HomeDuring from "./HomeDuring";
import HomeAfter from "./HomeAfter";


const Home = (appData) => {
  const {status, embedId} = appData.getData();

  let content;

  if (status === appData.T_PREROLL || status === appData.T_DURING) {
    content = (
      <HomeDuring {...appData}/>
    );
  } else if (status === appData.T_BEFORE) {
    content = (
      <HomeBefore {...appData}/>
    );
  } else if (status === appData.T_AFTER || status === appData.T_CLOSED) {
    content = (
      <HomeAfter {...appData}/>
    );
  }
   
  return (
    <div> 
      
      <h1 className="top-header">Welcome to Our Wedding</h1>
      <Navigation {...appData}/>

      { content }
      
    </div>
  )
}

export default Home;