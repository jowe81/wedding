import { Link } from "react-router-dom";
import LiveIcon from "./LiveIcon";
import './navigation.scss';

const Navigation = (appData) => {
  const {guestbookOpen, status} = appData.getData();

  let content;
  if ([appData.T_DURING, appData.T_PREROLL].includes(status)) {
    content =
      <div>
        <Link to="/">Ceremony<LiveIcon /></Link>&nbsp;|&nbsp;
        <Link to="/guestbook">Guestbook</Link>
        { guestbookOpen && <span>&nbsp;|&nbsp;<Link to="/sign">Sign the Guestbook</Link></span> }
      </div>;
  } else {
    content =
      <div>
        <Link to="/">Ceremony</Link>&nbsp;|&nbsp;
        <Link to="/guestbook">Guestbook</Link>
        { guestbookOpen && <span>&nbsp;|&nbsp;<Link to="/sign">Sign the Guestbook</Link></span> }
        { status === appData.T_BEFORE && <span>&nbsp;|&nbsp;<Link to="/trivia">About</Link></span> }
      </div>
  }
  return <div className="navigation-container">{content}</div>;

}

export default Navigation;