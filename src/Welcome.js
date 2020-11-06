import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import cookie from 'react-cookies'
import { v4 as uuidv4 } from 'uuid';
import { ArrowRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';


class Welcome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subjectCookie: null,

    };
  }

 
  
  componentDidMount() {
   cookie.save("my cookie", uuidv4())
  }

  


  render(){
    return (
      <div className="App">
       <header className="App-header-short">
    
         <h1>Welcome</h1>
        

        </header>
        <div style={{margin:"50px" ,justifyContent: 'center', alignItems: 'center'  }}> 


          This is my body content
          <br></br>
          <Link to="/HowToComplete">
          <ArrowRight size={80} />
          </Link>

        </div>


      </div>
    );
  }
}

export default Welcome;