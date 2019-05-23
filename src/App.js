import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state ={
      name: "",
      password: ""
    }
  }
  
  onSummitHandle =()=>{

      axios.post('http://localhost:5000/',{
        name: this.state.name,
        password: this.state.password
    })
    .then(
      ()=>{console.log("sccess");}
    )
    .catch(
      (err)=>{
        console.log(err)
      }
    )
  }



  
  render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input onChange={(e)=>this.setState({name: e.target.value})}></input>
        <br/>
    
        <input onChange={(e)=>this.setState({password: e.target.value})}></input>
        <br/>
        <button onClick={this.onSummitHandle}>sumnit</button>
      </header>
    </div>
  );
  }
}

export default App;
