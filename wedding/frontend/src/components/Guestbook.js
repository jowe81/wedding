import { useEffect, useState } from "react";
import Post from "./Post";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";

const Guestbook = (props) => {
  const [posts, setPosts] = useState([]);
  const [timeoutHandler, setTimeoutHandler] = useState();
  const navigate = useNavigate();

  const fetchData = () => {
    fetch("http://192.168.1.183/api/posts")
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
  
  if (posts.length) {
    console.log('posts');
  } else {
    console.log('nothing yet');
  }

  return (
    <div>
      <h1>Wedding Guestbook</h1>
      <Navigation />
      { posts.length ? <div><div className="entry_count">{posts.length} entries</div>{ getPosts() }</div> : <div className="guestbook_empty">Nothing to display yet.</div> }
    </div>
  )
}

export default Guestbook;