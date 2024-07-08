import React, { useState } from 'react';
import 'tachyons';
import './App.css';
import ParticlesBg from 'particles-bg';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkInput from './Components/ImageLinkInput/ImageLinkInput';
import FaceDetectedImage from './Components/FaceDetectedImage/FaceDetectedImage';

function App(){

  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [facesLoc, setFacesLoc] = useState([{}])
  const [route, setRoute] = useState('signin')
  const [isSignedin, setIsSignedin] = useState(false)

  const calculateFaceLocation = (result) => {
    const BBox = [];
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const regions = result.outputs[0].data.regions;
  
    regions.forEach(region => {
        const boundingBox = region.region_info.bounding_box;

        BBox.push({"top": boundingBox.top_row * height,
                   "left":boundingBox.left_col * width,
                   "bottom": height - (boundingBox.bottom_row * height), 
                   "right": width - (boundingBox.right_col * width)});
    });

    return BBox;

  }

  const displayFaceBox = (facesLoc) => {
    setFacesLoc(facesLoc);
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onButtonClicked = (event) => {
    setImageUrl(input);
      
    const PAT = 'ee8764e32e6044d3ba6d1ce3e40045e1';
    const USER_ID = 'clarifai';       
    const APP_ID = 'main';
    const MODEL_ID = 'face-detection';
  
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": input
                    }
                }
            }
        ]
    });
  
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
  
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => displayFaceBox(calculateFaceLocation(result)))
        .catch(error => console.log('error', error));
  }

  const onRouteChange = (route) => {
    if (route === 'home') {
      setIsSignedin(true);
    } else {
      setIsSignedin(false);
    }
    setRoute(route);
  }
  
    return (
      <div className="App">
        <ParticlesBg type="circle" bg={true} />
        <Navigation  isSignedin={isSignedin} onRouteChange={onRouteChange} />
        {route === 'signin'
          ? <Signin onRouteChange={onRouteChange} />
          : ( route === 'home'
            ? <div>
                <Logo />
                <Rank />
                <ImageLinkInput onInputChange={onInputChange} onButtonClicked={onButtonClicked} />
                <FaceDetectedImage imageUrl={imageUrl} facesLoc={facesLoc} />
              </div>
            : <div>
                <Register onRouteChange={onRouteChange} />
              </div>
          )
        }
      </div>
    );
}

export default App;
