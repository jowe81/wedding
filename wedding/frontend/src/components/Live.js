import useApplicationData from "../hooks/useApplicationData";


const Live = () => {

  const appData = useApplicationData();
  const props = appData.getData();

  const { embedId, status } = props;

  const autoplay = status === appData.T_AFTER ? '0' : '1';

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

  
  return (<div>{ ytEmbed(embedId) }</div>);
}

export default Live;