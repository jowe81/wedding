import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Navigation from "./Navigation";
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Autocomplete from '@mui/material/Autocomplete';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Sign = (appData) => {
  
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [requiredFieldsMissing, setrequiredFieldsMissing] = useState([]);
  const [post, setPost] = useState({
    name: '',
    email: '',
    city: '',
    country: '',
    text: '',
    image: '',
  });

  const updateState = (event, value) => {
    const key = event.target.id
    const newPost = { ...post };
    if (value) {
      //The Autocomplete passes the value as second parameter
      newPost.country = value;
    } else {
      newPost[event.target.id] = event.target.value;
    }

    setPost(newPost);    
  }

  const countries = [
    'Canada', 
    'Germany', 
    'United States',
    'United Kingdom',
    'Switzerland',
    'Holland',
    'Sweden',
    'Brazil',
    'South Africa',
    'Ghana',
    'Pakistan',
    'Australia',
    'Other'
  ];

  const maximumFileSizeMB = 10;

  const handleChange = (e) => {
    if (e.target.files[0].size <= maximumFileSizeMB * 1024 * 1024) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      console.error(`File size is too big. Maximum file size is ${maximumFileSizeMB} MB.`);
    }
  };

  const postNewEntry = () => {

    if (!(post.name && post.text)) {
      const missingFields = [];
      if (!post.name) {
        missingFields.push('name');
      }
      if (!post.text) {
        missingFields.push('text');
      }
      setrequiredFieldsMissing(missingFields);
    } else {

      setLoading(true);
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', post.name);
      formData.append('city', post.city);
      formData.append('country', post.country);
      formData.append('email', post.email);
      formData.append('text', post.text);
      
  
      return axios.post(
          `${appData.T_API_SERVER_URL}posts`,
          formData, 
          { headers: { "Content-Type": "multipart/form-data" },
        })    
        .then(() => navigate('/guestbook'))      
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
  
    }
    
  };


  const getRequiredFieldsMissing = () => {

    if (Array.isArray(requiredFieldsMissing) && requiredFieldsMissing.length > 0) {
      const labels = [];

      if (requiredFieldsMissing.includes('name')) {
        labels.push('Name');
      };

      if (requiredFieldsMissing.includes('text')) {
        labels.push('Message');
      };

      const msg = 'Please enter a value for ' + labels.join(' and ');

      return (<div className="requiredFieldsMissing">{msg}</div>);
      
    }
  }


  const triggerFileSelect = () => {
    document.getElementById("selectImage").click()
  }
  
  return (
    <>
      <div>
        <h1 className="top-header">Wedding Guestbook</h1>
        <Navigation {...appData}/>
        { requiredFieldsMissing && getRequiredFieldsMissing() }
        <div className="guestbook-form">
          <div>
            <div className="fieldLabel">Your Name</div>
            <TextField 
              required
              value={post.name}
              onChange={updateState}
              className="guestbook-form-element"
              id="name" 
              variant="outlined" 
              placeholder="Name"
            />
          </div>
          <div>
            <div className="fieldLabel">Your Email Address</div>
            <div className="annotation">Optional - so we can get back to you.<br></br>Will not be displayed or shared.</div>
            <TextField 
              value={post.email}
              onChange={updateState}
              className="guestbook-form-element"
              id="email" 
              variant="outlined" 
              placeholder="Email"
            />
          </div>
          <div>
            <div className="fieldLabel">Your Location</div>
            <div className="annotation">Optional</div>
            <TextField 
              value={post.city}
              onChange={updateState}
              className="guestbook-form-element"
              id="city"
              variant="outlined"
              placeholder="City"
            />
            <Autocomplete
              className="guestbook-form-element"
              onChange={updateState}  
              disablePortal
              id="country"
              options={countries}
              renderInput={(params) => <TextField 
                {...params} 
                value={post.country}
                placeholder="Country" />}
            />
          </div>
          <div>
            <div className="fieldLabel">Your Message:</div>
            <TextareaAutosize className="guestbook-form-element messageText"
              value={post.text}
              onChange={updateState}
              id="text"
              aria-label="Message"
              minRows={5}                      
            />
          </div>
          <div>
            <div className='fieldLabel'>Attach a photo of yourself:</div>
            <div className="annotation">Optional - so we can see who joined us remotely.</div>
            <div>
              <input id='selectImage' hidden type="file" label="Choose me" onChange={handleChange} />
            </div>
            <div className='preview_container' onClick={triggerFileSelect} >
              {preview && <img src={preview} alt="Preview" />}
              {!preview && 
              <div className='camera-icon'>
                <PhotoCameraIcon/>
                <div><small>Tap here to select a file or take a picture</small></div>                
              </div>}
            </div>
            { requiredFieldsMissing && getRequiredFieldsMissing()}
            <Button className='submit-button' onClick={postNewEntry} variant="contained">
              {loading ? 'Posting...' : 'Submit Your Entry'}
            </Button>            
          </div>        
        </div>      
      </div>
    </>
  );
};

export default Sign;
