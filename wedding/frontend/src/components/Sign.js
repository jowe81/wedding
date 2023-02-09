import { useState } from "react";
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

const Sign = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [city, setCity] = useState('');
  // const [country, setCountry] = useState('');
  // const [text, setText] = useState('');
  const navigate = useNavigate();

  const [post, setPost] = useState({
    name: '',
    email: '',
    city: '',
    country: '',
    text: ''
  });

  const [requiredFieldsMissing, setrequiredFieldsMissing] = useState([]);

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
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands"
  ];
  

  const submitForm = (event) => {

    if (post.name && post.text) {
      axios
      .post("http://localhost/api/posts", post)
      .then(res => console.log(res))
      .then(() => navigate('/guestbook'));
    } else {
      const missingFields = [];
      if (!post.name) {
        missingFields.push('name');
      }
      if (!post.text) {
        missingFields.push('text');
      }
      setrequiredFieldsMissing(missingFields);
    }

  }

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

  return (
    <div>
      <h1 className="top-header">Wedding Guestbook</h1>
      <Navigation />

      { getRequiredFieldsMissing() }

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
          <TextareaAutosize
            value={post.text}
            onChange={updateState}
            className="guestbook-form-element"
            id="text"
            aria-label="Message"
            minRows={10}                      
          />
        </div>
      </div>
      <Button onClick={submitForm}>Submit</Button>
    </div>
  )
}

export default Sign;