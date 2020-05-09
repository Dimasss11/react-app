import React, {Component} from 'react';
import {firebase} from '../database/config';

class Auth extends Component{

  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.setAuth=this.props.setAuth;
    this.state={msg:''};
  }

  handleSubmit(event){
    event.preventDefault();
    const login=event.target.elements.login.value;
    const password=event.target.elements.password.value;
    firebase.auth().signInWithEmailAndPassword(login, password).then((user)=>{
      this.props.setAuth();
    }).catch(function(error) {
      if (error.code === 'auth/wrong-password') this.setState({msg:'Wrong password'});
      if (error.code==='auth/invalid-email') this.setState({msg:'Wrong email'})
    }.bind(this));
  }

  closeMsg(){
    this.setState({msg:''});
  }

  render(){
    return(
    <div>
      <div className="form">
        <form onSubmit={this.handleSubmit}>
        <h1>Sign</h1>
        {this.state.msg && <div className='alert'>
            <span className="closebtn" onClick={this.closeMsg.bind(this)}>&times;</span> 
            <strong>{this.state.msg}</strong></div>
        }
          <input type="text" placeholder="login" name="login"/>
          <input type="password" placeholder="password" name="password"/>
          <button className="formbtn"> login </button>
        </form>
      </div>
    </div> 
  )}
}



export default Auth;