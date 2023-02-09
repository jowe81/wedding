const Post = ({ post }) => {

  const name  = post => post.name ? <div className="name">{ post.name } </div> : null;
  
  const location = post => { 
    let items = [];
    items.push(post.city);
    items.push(post.country);
    items = items.filter(item => item !== '');
    
    if (items.length) {
      return (
        <div className="location">From { items.join(', ') } </div>
      );
    }
  };

  const text = post => post.text ? <div className="text"> { post.text } </div> : null;
  const createdAt = post => {
    const date = new Date(post.created_at);
    return post.created_at ? <div className="created_at"> { date.toLocaleDateString() }, { date.toLocaleTimeString() } </div> : null;
  }

  return (
    <div className="post">
      { name(post) }
      { location(post) }
      { text(post) }
      { createdAt(post) }
    </div>
  )

}

export default Post;