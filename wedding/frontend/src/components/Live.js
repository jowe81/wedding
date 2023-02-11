import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import LiveCreds from "./LiveCreds";

const Live = (appData) => {
  const { status, embedId, autoplay } = appData.getData();

  const [n, setN] = useState(0);
  console.log(`Rendering Live Component (${n}, ${embedId})`);
  
  useEffect(() => {
    console.log('Setting force-update interval.');
    const clear = setInterval(() => {
      console.log('Forcing re-render.');
      setN(Math.floor(Math.random() * 1000000));
    }, 20000);
    return () => {
      console.log('Clearing force-update interval.');
      clearInterval(clear);
    };
  }, []);


  const autoplayVal = autoplay ? '1' : '0';
  const muteVal = autoplay ? '0' : '1';

  const ytEmbed = (embedId) => (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube-nocookie.com/embed/${embedId}?autoplay=${autoplay}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );  

  let text;

  switch (status) {
    case appData.T_DURING:
      text = <>
        <p>
            The wedding ceremony is brought to you live by the amazing team named below.
            These are all people that Johannes has journeyed with over the last few years.
            If you're enoying the broadcast, maybe you would like to offer them some words of encouragement in the guestbook after!
        </p>
        <LiveCreds />
      </>;
      break;

    case appData.T_AFTER:
      text = <>
        <p>
          The wedding ceremony was brought to you live by the amazing team named below.
          These are all people that Johannes has journeyed with over the last few years.
          If you enjoyed the broadcast, maybe you would like to offer some words of encouragement in the guestbook!
          Note that the guestbook closes at the end of February 20.
        </p>
        <LiveCreds />
      </>
      break;

    case appData.T_CLOSED:
      text = <>
        <p>
          The wedding ceremony was brought to you live by the amazing team named below.
        </p>
        <LiveCreds />
      </>      
      break;

    case appData.T_PREROLL:
      text = <>        
      </>
      break;

  }

  return (
    <>
      <div className="live-embed">
        { ytEmbed(embedId) }
      </div>

      { (status === appData.T_PREROLL) && <Countdown />}

      <div className="home-message padded-text-div">
        {text}
      </div>
    </>
  );
}

export default Live;