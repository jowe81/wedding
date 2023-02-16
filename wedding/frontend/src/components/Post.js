import { red } from "@mui/material/colors";

const Post = ({appData, post}) => {

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

  const image = post => post.image ? <div><img className='thumb' src={appData.T_API_SERVER_IMAGES + post.image} /></div> : '';

  const text = post => post.text ? <div className="text"> { post.text } </div> : null;
  const createdAt = post => {
    const date = new Date(post.created_at);
    return post.created_at ? <div className="created_at"> { date.toLocaleDateString() }, { date.toLocaleTimeString() } </div> : null;
  }

  const backgroundImage = post.image ? 
    `linear-gradient(to bottom, rgba(0, 0, 0, 0.7) , rgba(0, 0, 0, .7)), url("${appData.T_API_SERVER_IMAGES + post.image}")` :
    `linear-gradient(to bottom, rgba(150, 150, 150, 0.1) , rgba(150, 150, 150, .1))`

  const divStyle = {
    backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center'

  }

  return (
    <div className="post" style={divStyle}>
      { image(post) }
      { name(post) }
      { location(post) }
      { text(post) }
      { createdAt(post) }      
    </div>
  )

}

export default Post;