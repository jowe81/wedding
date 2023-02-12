import './livecreds.scss';

export default function LiveCreds() {
  return (
    <div className="flex livecreds-container">
      <div>
        <small className="text-grey font-small">
        Kate Horodyski - Video Director<br/>
        Adrian Chung - Camera 1<br/>
        Jasna Stojanovic - Camera 2<br/>
        Raymond Lew - Cameras 3, 4 (PTZ)<br/>
        Kevin Chow - Camera 5 (Handheld)
        </small>

      </div>
      <div>
      <small className="text-grey font-small">
      Boris Chung - Broadcast Audio / Media<br/>
      Lorraine Ma - Front of House Media<br/>
      Brad Danyluk - Front of House Audio<br/><br/>
      Lucas Swaddling - Technical Director
      </small>

      </div>
    </div>
  );
}