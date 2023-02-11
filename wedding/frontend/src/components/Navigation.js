import { Link } from "react-router-dom";

const Navigation = (appData) => {
  const {guestbookOpen, status} = appData.getData();
  
  return (
    <div>
      <Link to="/">Ceremony</Link>&nbsp;|&nbsp;
      <Link to="/guestbook">Guestbook</Link>
      { guestbookOpen && <span>&nbsp;|&nbsp;<Link to="/sign">Sign the Guestbook</Link></span> }
    </div>
  );
}

export default Navigation;