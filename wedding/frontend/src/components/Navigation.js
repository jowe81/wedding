import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Link to="/">Live</Link>&nbsp;|&nbsp;
      <Link to="/guestbook">Guestbook</Link>&nbsp;|&nbsp;
      <Link to="/sign">Sign the Guestbook</Link>
    </div>
  );
}

export default Navigation;