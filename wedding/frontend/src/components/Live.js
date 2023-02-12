import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import LiveCreds from "./LiveCreds";

const Live = (appData) => {
  const { status, embedId, autoplay } = appData.getData();

  const autoplayVal = autoplay ? '1' : '0';
  const muteVal = autoplay ? '1' : '0';

  const [n, setN] = useState(0);

  console.log(`Rendering Live Component with embedId ${embedId}. AP/M: ${autoplayVal}/${muteVal}`);
  
  //Force the iframe to rerender when the embedid changes
  useEffect(() => {
    const localEmbedId = JSON.parse(localStorage.getItem('embedId'));
    console.log('Local: ', localEmbedId, 'Incoming: ', embedId);
    if (localEmbedId !== embedId) {
      setN(Math.floor(Math.random() * 1000000));
      localStorage.setItem('embedId', JSON.stringify(embedId));
    }
  }, [embedId]);


  const ytEmbed = (embedId) => {   
    console.log(`Status ${status}: setting autoplay/mute ${autoplayVal}/${muteVal} `);
    return (
      <div className="video-responsive">
        <iframe
          key={n}
          width="853"
          height="480"
          src={`https://www.youtube-nocookie.com/embed/${embedId}?autoplay=${autoplayVal}&mute=${muteVal}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    );  
  };



  return (
    <>
      <div className="live-embed">
        { ytEmbed(embedId) }
      </div>

      { (status === appData.T_PREROLL) && <Countdown />}

      <div className="home-message padded-text-div">
        <LiveCreds/>
      </div>
    </>
  );
}

export default Live;