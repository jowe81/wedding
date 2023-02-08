import useApplicationData from "../hooks/useApplicationData";

const Live = () => {

  const appData = useApplicationData();
  const { status, embedId, autoplay } = appData.getData();
  
  const autoplayVal = autoplay ? '1' : '0';

  console.log('autoplayVal: ', autoplayVal);

  const ytEmbed = (embedId) => (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}?autoplay=${autoplay}&mute=1`}
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
      text = <p>
          The wedding ceremony is brought to you live by the amazing team named below.
          These are all people that Johannes has journeyed with over the last few years.
          If you're enoying the broadcast, maybe you would like to offer them some words of encouragement in the guestbook after!
      </p>;
      break;

    case appData.T_AFTER:
      text = <p>
          The wedding ceremony was brought to you live by the amazing team named below.
          These are all people that Johannes has journeyed with over the last few years.
          If you enjoyed the broadcast, maybe you would like to offer some words of encouragement in the guestbook!
          Note that the guestbook closes at the end of February 20.
      </p>
      break;

    case appData.T_CLOSED:
      text = <p>
          The wedding ceremony was brought to you live by the amazing team named below.
      </p>
      break;

  }
  

  return (
    <>
      <div className="live-embed">
        { ytEmbed(embedId) }
      </div>
      <div className="home-message padded-text-div">
        {text}
        <p>
          <small className="text-grey font-small">
          Kate Horodyski - Live Video Director,
          Jasna Stojanovic - Broadcast Camera Operator,
          Adrian Chung - Broadcast Camera Operator,
          Raymond Lew - Broadcast Camera Operator (PTZ cameras),
          Kevin Chow - Broadcast Camera Operator (Handheld),

          Boris Chung - Broadcast Audio / Media Operator,
          Lorraine Ma - Front of House Media Operator,

          Brad Danyluk - Front of House Audio Engineer,
          Lucas Swaddling - Technical Director
          </small>
        </p>
      </div>
    </>
  );
}

export default Live;