import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Auth from './Auth';
import Addproduct from './Addproduct';
import Productlist from './Productlist';

import Edit from './Edit';

class Main extends Component{
  
  constructor(){
    super();
  }

  componentDidMount(){
    this.props.startLoadingAuth();
  }
 
  render(){
   if(!this.props.isAuth[0]){
        return (
          <div>
             <Auth {...this.props}/>
             
          </div>
        )
    }else{
      return(
        <div>
          <Switch>
          <Route exact path="/" render={()=>(
            <div><Productlist {...this.props}/></div>
          )}/>
          <Route path="/Addproduct" render={({history})=>(
            <Addproduct {...this.props} />
          )}/>
          {
            this.props.products.length>0 &&          
          <Route path="/edit/:id" render={(params)=>(
            <Edit {...this.props} {...params} />
          )}/>
          }
          </Switch>
        </div>
      )
    }

  }
}


export default Main;