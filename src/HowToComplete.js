import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import cookie from 'react-cookies'
import { v4 as uuidv4 } from 'uuid';
import { ArrowRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';


class HowToComplete extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subjectCookie: cookie.load("my cookie"),

    };
  }

 
  
  componentDidMount() {
   cookie.save("my cookie", uuidv4())
  }

  


  render(){
    return (
      <div className="App">
       <header className="App-header-short">
    
         <h1>Instructions</h1>

        </header>
        <div style={{margin:"50px" ,justifyContent: 'center', alignItems: 'center'  }}> 


          What you will be asked to do
          <br></br>
          <Link to="/HardwareTest">
          <ArrowRight size={80} />
          </Link>

        </div>


      </div>
    );
  }
}

export default HowToComplete;