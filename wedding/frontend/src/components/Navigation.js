import { Link } from "react-router-dom";

import useApplicationData from "../hooks/useApplicationData";

const Navigation = () => {
  const appData = useApplicationData();
  const {guestbookOpen, status} = appData.getData();
  
  const linkLabel = status === appData.T_AFTER ? 'Ceremony' : 'Live';
  
  return (
    <div>
      <Link to="/">{linkLabel}</Link>&nbsp;|&nbsp;
      <Link to="/guestbook">Guestbook</Link>
      { guestbookOpen && <span>&nbsp;|&nbsp;<Link to="/sign">Sign the Guestbook</Link></span> }
    </div>
  );
}

export default Navigation;