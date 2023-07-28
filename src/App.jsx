import './App.css';
import * as faceapi from "face-api.js";
import {useEffect, useRef} from "react";

function App() {
  const imgRef= useRef();
  const canvasRef= useRef();
  useEffect(()=>{
    const loadModels =()=>{
      Promise.all([
        faceapi.nets.faceExpression.Nets.loadFromuri("/models"),
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceRecognition.Nets.loadFromuri("/models"),  
        faceapi.nets.faceLandmark68.Nets.loadFromuri("/models"),     
      ])
      .then(console.log("its done")).catch((e)=> console.log(e));
    };
    imgRef.current && loadModels();
  },[]);
  return (
    <div className="App">
     
        <img  ref={imgRef} src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" 
          width="940"
          height="650" alt="logo" />
       <canvas ref={canvasRef} width="940"
          height="650" />
      
    </div>
  );
}

export default App;
