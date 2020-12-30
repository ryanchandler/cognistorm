import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import cookie from 'react-cookies'
import { v4 as uuidv4 } from 'uuid';
import { ArrowRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';


class ErrorPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
  

    };
  }

 
  

  


  render(){
    return (
      <div className="App">
       <header className="App-header-short">
    
         <h1>Error</h1>
         <h4>Your browser is not accepting (or retaining) the subject tracking cookie.</h4>

        </header>
        <div style={{margin:"50px" ,justifyContent: 'center', alignItems: 'center'  }}> 




        </div>


      </div>
    );
  }
}

export default ErrorPage;