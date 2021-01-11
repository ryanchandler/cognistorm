import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';



class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subjectCookie: null,

    };
  }

  


  render(){
    return (
      <div className="App">
        <header className="App-header-short">
    
         <h1>CogniStorm</h1>
         <h4>Artificial Intelligence Development Portal</h4>

        </header>

        <div style={{margin:"50px" ,justifyContent: 'center', alignItems: 'center'  }}> 


          Proceed to Voice Actor Page
          <br></br>
          <Link to="/Welcome">
          <ArrowRight size={80} />
          </Link>

        </div>



        
      </div>
    );
  }
}

export default Home;