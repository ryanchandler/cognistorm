import React from 'react';
import logo from './logo.svg';
import './App.css';


function App() {

  
  
  
  componentDidMount () {
    const script = document.createElement("script");
    script.src = "https://assets.crowd.aws/crowd-html-elements.js";
    script.async = true;
    document.body.appendChild(script);
}



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        

        <crowd-form>
  <crowd-bounding-box
    name="annotatedResult"
    labels="['Basketball player', 'Referee']"
    src="https://s3.amazonaws.com/cv-demo-images/basketball-outdoor.jpg"
    header="Draw boxes around each basketball player and referee in this image"
  >
    <full-instructions header="Bounding Box Instructions" >
      <p>Use the bounding box tool to draw boxes around the requested target of interest:</p>
      <ol>
        <li>Draw a rectangle using your mouse over each instance of the target.</li>
        <li>Make sure the box does not cut into the target, leave a 2 - 3 pixel margin</li>
        <li>
          When targets are overlapping, draw a box around each object,
          include all contiguous parts of the target in the box.
          Do not include parts that are completely overlapped by another object.
        </li>
        <li>
          Do not include parts of the target that cannot be seen,
          even though you think you can interpolate the whole shape of the target.
        </li>
        <li>Avoid shadows, they're not considered as a part of the target.</li>
        <li>If the target goes off the screen, label up to the edge of the image.</li>
      </ol>
    </full-instructions>

    <short-instructions>
      Draw boxes around each basketball player and referee in this image.
    </short-instructions>
  </crowd-bounding-box>
</crowd-form>
      </header>
    </div>
  );
}

export default App;
