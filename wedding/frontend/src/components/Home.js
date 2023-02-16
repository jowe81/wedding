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
   
  const serverOffset= Math.abs(appData.serverOffset);
  const maxOffset = Math.abs(appData.T_MAX_OFFSET_MINUTES * 60 * 1000);
  console.log(`Server offset/max offset: ${serverOffset}/${maxOffset}`);
  if (serverOffset > maxOffset){
    console.warn(`Device clock is more than ${appData.T_MAX_OFFSET_MINUTES} minutes out.`)
  }
  
  return (
    <div>       
      <h1 className="top-header">Welcome to Our Wedding</h1>
      <Navigation {...appData}/>
      { serverOffset > maxOffset &&
        <div className="text-warning warning-header">
          Warning: Your device's clock is more than { appData.T_MAX_OFFSET_MINUTES } minutes off. 
          Please adjust it and refresh the page to make sure you won't miss the broadcast.<br></br>
          If you are unable to get rid of this message, <a href='https://youtube.com/@j-and-j'>visit our Youtube Channel</a> to locate the stream there.
        </div>
      }
      { content }
      
    </div>
  )
}

export default Home;