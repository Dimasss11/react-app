import React, { Component } from 'react';
import { subDays } from 'date-fns'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker.css";

 const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Addproduct extends Component {
  constructor(props) {
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.state = {
      startDate: subDays(new Date(), -1),
      isDate:false,
      errors: {
        name: '',
        imageLink:'',
        description: '',
        price: '',
        discount:'',
        date:''
      }
    };
 
  }

  handleChange = (event) => {
    const scope = this;
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'name': 
        errors.name = 
          value.length < 20 ? 'Name must be 20 characters long!':
          value.length > 60 ? 'Name must not be 60 characters long!':
            '';
        break;
      case 'description': 
        errors.description = 
          value == null ? '':
          value.length > 200 ? 'description must not be 200 characters long!':
          '';
        break;
        case 'price': 
        
        errors.price = 
          value > 99999999.99 ? 'price must not be more than 99999999.99!':
          '';
         if( value === "") errors.price='price must not be empty!'; 
        break;
        case 'discount': 
        errors.discount = 
          value.length <1 ? '':
          value > 90 ? 'discount must not be more than 90!':
          value < 10 ? 'discount must not be less than 10!':
          '';
          value.length>0 ? scope.setState({isDate:true}):scope.setState({isDate:false});
          if(scope.state.date==null){
            scope.changeDate(subDays(new Date(), -1));
            scope.setState({date:subDays(new Date(), -1)})
          }
        break;
        case 'date': 
        errors.date = 
          value == null ? 'date is not set':
          value.length > 1 ? '':
          '';
        break;
        case 'imageLink':
          var img = new Image();
          img.src = event.target.value;
          img.onload = function(){
             let msg = 
              img.width < 200 && img.height < 200 ? 'picture must not be less than 200px!':
              img.width > 4000 && img.height > 4000 ? 'picture must not be more than 4000px!':
            '';
            scope.setState(prevState => {
              let errors = Object.assign({}, prevState.errors);
              errors.imageLink=msg;
              return { errors };
            });
           
          }
          img.onerror=function(){
            scope.setState(prevState => {
              let errors = Object.assign({}, prevState.errors);
              errors.imageLink='image not found';
              return { errors };
            });
          }; 
        break;
      default:
        break;
    }
    this.setState({errors, [name]: value});
  
    if(name==='discount'&&value.length<1){
      scope.setState(prevState => {
        let errors = Object.assign({}, prevState.errors);
        errors.date='';
        return { errors };
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let imageLink=event.target.elements.imageLink.value;
    let description=event.target.elements.description.value;
    let name=event.target.elements.name.value;
    let price=event.target.elements.price.value;
    let product={
      id:Number(new Date()),
      imageLink:imageLink,
      name:name,
      price:price
    }
    let scope=this;

    if(this.state.discount&&this.state.startDate){
      product={...product, discount:this.state.discount,
        date:this.state.startDate}
    }

    if(!imageLink||!name||!price){Object.keys(product).forEach(function(key){
      let value=product[key]!==undefined ? product[key]:'';
      let a={target:{ name: key, value:value}};
      scope.handleChange(a);
    });}

    if(validateForm(this.state.errors)) {
      product={...product, description:description}
      this.props.addingProduct(product);
      this.props.history.push('/');
    }
  }

  changeDate(date){
    this.setState({startDate: date});
      const event={};
      event.target={ name:'date', value:date};
      this.handleChange(event);
      if(date==null){
        this.setState(prevState => {
          let errors = Object.assign({}, prevState.errors);
          errors.date='date is not set';
          return { errors };
        });
      }
      
  }


  render() {
    const {errors} = this.state;
    return (<div>
      <div className="form">
        <form name='update' onSubmit={this.handleSubmit.bind(this)}>
        <h1>Add</h1>
        {errors.name.length > 1 && <div className='alert'><strong>{errors.name}</strong></div>}
        {errors.description.length > 1 && <div className='alert'><strong>{errors.description}</strong></div>}
        {errors.price.length > 1 && <div className='alert'><strong>{errors.price}</strong></div>}
        {errors.imageLink.length > 1 && <div className='alert'><strong>{errors.imageLink}</strong></div>}
        {errors.discount.length > 1 && <div className='alert'><strong>{errors.discount}</strong></div>}
        {errors.date.length > 1 && <div className='alert'><strong>{errors.date}</strong></div>}
          <div>
            <label> image link </label> 
            <input type="text" placeholder="Link" name="imageLink" onChange={this.handleChange}/><br/>
          </div>
          <div>
            <label>name </label>  
            <input type="text" placeholder="name" name="name" onChange={this.handleChange}/>
          </div>
          <div>
            <label>description </label> 
            <input type="text" placeholder="description" name="description" onChange={this.handleChange}/>    
          </div>
          <div>
            <label>price </label> 
            <input type="number"  min='0.00' placeholder="price" name="price" onChange={this.handleChange}/>
          </div>
          <div>
            <label>discount </label> 
            <input type="number"  min='10' max='90' placeholder="discount" name="discount" onChange={this.handleChange}/>
          </div>
           {this.state.isDate&&
          <div>
            <label>date end</label> 
            <div className="customDatePickerWidth">
              <DatePicker  
                selected={this.state.startDate}
                onChange={this.changeDate.bind(this)}
                minDate={subDays(new Date(), -1)} 
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          }
          <button className="formbtn">Add</button>
        </form>
      </div>
</div>
    );
  }
}

export default Addproduct;