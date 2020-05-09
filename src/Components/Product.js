import React from 'react';
import {Link} from 'react-router-dom';

function Product( props ){
  let discountPrice, diffDays;
  if(props.product.date&&(new Date()<=new Date(props.product.date))){
    discountPrice=props.product.price-(props.product.discount/100*props.product.price);
    discountPrice=discountPrice.toFixed(2);
    let date1 = new Date();
    let date2 = new Date(props.product.date);
    diffDays=Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    diffDays=diffDays===1?`${diffDays} day`: `${diffDays} days`;
  }

  const product=props.product;
    return (
      <div className="card">
        <div className='img'>
         <img src={product.imageLink} alt=" " style={{width:'100%', objectFit: 'cover'}}/> 
        </div>
        <h2>{product.name}</h2>
        {!discountPrice&&<p className="title">{product.price}$</p>}
        {discountPrice&& <div>
            <p className="title"><del>{product.price}$</del></p>
            <p className="title">{discountPrice}$</p>
        <p className="title">{diffDays} left to avail {props.product.discount}% discount</p>
          </div>
        }
        <p>{product.description}</p>
        <Link to={`/edit/${product.id}`}><div className="cardbtn">change</div></Link>
        <p><button className="cardbtn"  onClick={()=>{
            props.removingProduct(props.index, product.id);
            props.history.push('/');
        }}>Delete</button></p>
      </div>
    )
};

export default Product;
