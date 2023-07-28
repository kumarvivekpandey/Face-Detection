import './App.css';
import * as faceapi from "face-api.js";
import {useEffect, useRef} from "react";

function App() {
  const imgRef= useRef();
  const canvasRef= useRef();
  const handleImage = async()=>{
    const detections = await faceapi .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks().withFaceExpressions();
    console.log(detections);
  };
  useEffect(()=>{
    const loadModels =()=>{
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ])
      .then(console.log(handleImage))
        .catch((e)=> console.log(e));
    };
    imgRef.current && loadModels();
  },[]);
  return (
    <div className="App">
     
         <img 
           ref={imgRef} src="https://img.freepik.com/free-photo/people-taking-selfie-together-registration-day_23-2149096795.jpg" 
          width="940"
          height="650" alt="logo" />
       <canvas ref={canvasRef} width="940"
          height="650" />
      
    </div>
  );
}

export default App;
