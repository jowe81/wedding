import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from "react";

const UpdateEmbedId = (appData) => {

  const [embedId, setEmbedId] = useState('');
  const [storedEmbedId, setStoredEmbedId] = useState();
  
  const linkWithStoredEmbedId = `https://youtube.com/live/${storedEmbedId}`;

  useEffect(() => {    
    axios
      .get(appData.T_API_SERVER_URL + "embed-id")
      .then(res => {
        setStoredEmbedId(res.data?.embedid);
        console.log('Retrieved currently stored Embed Id from server:', res.data);
      })
  }, []);

  const updateState = (event) => {
    const embedId = event.target.value;
    setEmbedId(embedId);
  }

  const postEmbedId = () => {
    console.log('Posting new embedId: ', embedId);
    axios
      .post(appData.T_API_SERVER_URL + "embed-id", { embedId })
      .then(res => {
        setStoredEmbedId(res.data?.embedId);
        console.log('Confirmed posted Embed Id: ', res.data);
      });
  }

  return (
    <div>
      <h1 className="top-header">Update Embed Id</h1>
      <div className="home-message padded-text-div">
        Lucas, if the stream URL changes for whatever reason, you can enter the new ID here, so that visitors to the site won't know the difference.
        <br></br>
        <div className="home-message padded-text-div">
            The current ID is:
            <br></br>
            <strong className="text-warning">{storedEmbedId}</strong>
        </div>
        <div className="home-message padded-text-div">
            Double check its validity by following this link: 
            <br></br>
            <a href={linkWithStoredEmbedId}>{linkWithStoredEmbedId}</a>
        </div>
      </div>
      <div className="guestbook-form">
        <div>
          <div className="fieldLabel">Enter a new Embed Id:</div>
          <TextField 
            required
            value={embedId}
            onChange={updateState}
            className="guestbook-form-element"
            id="name" 
            variant="outlined" 
            placeholder=""
          />
        </div>
      </div>
      <div className="home-message padded-text-div">
        <Button type="button" variant="contained" className="btn btn-warning" onClick={postEmbedId}>Submit New Embed Id</Button>
      </div>
    </div>
  )
}

export default UpdateEmbedId;