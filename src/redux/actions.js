import {database, firebase} from '../database/config';


export function startLoadingAuth(){
  return {
    type: 'START_AUTH'
  }
}


export function authUser(login, password){
  firebase.auth().signInWithEmailAndPassword(login, password);
  firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      setAuth();
    } 
    });
}

export function addingProduct(product){
  return (dispatch)=>{
    database.ref('products').update({[product.id]:product}).then(()=>{
    }).catch(error=>{
      console.log(error);
    });
  }
}

export function loadingProduct(){
  return(dispatch)=>{
    database.ref('products').once('value').then(snapshot=>{
      let products=[];
      snapshot.forEach((childSnapshot)=>{
        products.push(childSnapshot.val())
      })
      dispatch(loadProducts(products))
    })
  }
}

export function removingProduct(index, id){
  return (dispatch)=>{
    database.ref(`products/${id}`).remove().then(()=>{
      dispatch((removeProduct(index)))
    })
  }
}


export function loadProducts(products){
  return {
    type: 'LOAD_PRODUCTS',
    products
  }
}

export function setAuth(){
  return {
    type:'SET_AUTH'
  }
}

export function removeProduct(index){
  return {
    type:'REMOVE_PRODUCT',
    index
  }
}