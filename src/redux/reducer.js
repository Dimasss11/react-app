import {combineReducers} from 'redux';

function isAuth(state=[], action){
  switch(action.type){
    case 'START_AUTH' : 
      if(!state.isAuth){
        return [false];
      } 
    break;
    case 'SET_AUTH':
      return [true];
    default:  return state;
  }
  return state
}

function products(state=[], action){
  switch(action.type){
    case 'REMOVE_PRODUCT': return [...state.slice(0, action.index), ...state.slice(action.index+1)]
    case 'LOAD_PRODUCTS': return action.products;
      default: return state
  }

}


const rootReducer=combineReducers({isAuth, products});

export default rootReducer;