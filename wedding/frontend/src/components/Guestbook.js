import { useEffect, useState } from "react";
import Post from "./Post";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";

import useApplicationData from "../hooks/useApplicationData";

const Guestbook = () => {
  const appData = useApplicationData();
  const { status, guestbookOpen } = appData.getData();

  const [posts, setPosts] = useState([]);
  const [timeoutHandler, setTimeoutHandler] = useState();
  const navigate = useNavigate();

  const fetchData = () => {
    fetch(appData.T_API_SERVER_URL + "posts")
      .then(res => res.json())
      .then(res => setPosts(res));
  }

  useEffect(fetchData, []);

  useEffect(() => {
    //Refresh posts periodically
    setInterval(fetchData, 10000)
  }, []);

  const getPosts = () => {
    return posts.map(post => <Post key = {post.id} post = { post } />);
  }
  
  let empty_guestbook = 'Nothing to display yet! Be the first one to sign!';
  let not_yet_open = 'The guestbook has not opened yet. You will be able to sign it between February 18th and February 20th.';
  let no_longer_open = 'The guestbook no longer accepts new entries.';
  let please_sign = "Please sign the guestbook if you haven't yet!"
  let something_wrong = "The guestbook should be open. If you see this message, unfortunately something went wrong. :(";

  let text;
  
  if (status === appData.T_BEFORE) {
    //Before
    text = not_yet_open;
  } else if (status === appData.T_DURING) {
    //Day of    
    text =  posts.length ? <div><div className="entry_count">{posts.length} entries</div>{ getPosts() }</div> : empty_guestbook;
    if (posts.length) {
      text = please_sign;
    } else {
      if (guestbookOpen) {
        if (posts.length) {
          text = please_sign;
        } else {
          text = empty_guestbook;
        }
      } else {
        text = something_wrong;
      }
      }
  } else {
    //After
    if (guestbookOpen) {
      if (posts.length) {
        text = please_sign;
      } else {
        text = empty_guestbook;
      }
    } else {
      text = no_longer_open;
    }
  }

  return (
    <div>
      <h1 className="top-header">Wedding Guestbook</h1>
      <Navigation />
      <div className="home-message padded-text-div">{ text }</div>
      { getPosts() }
    </div>
  )
}

export default Guestbook;