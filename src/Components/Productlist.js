import React from 'react';
import {Link} from 'react-router-dom';
import Product from './Product';

function Productlist(props) {
 props.loadingProduct() 
  
  return <div>
    <Link  className="addIcon" to="/Addproduct"></Link>
          <div className='wrapeproduct'>
           {props.products
           .map((product, index)=><Product key={index} date={product.date} discount={product.discount} product={product} {...props} index={index}/>)
           }
          </div>
        </div>
        
}

export default Productlist;
