import { combineReducers } from 'redux';
import ContactReducer  from './ContactReducer';

const rootReducer = combineReducers({
   contact: ContactReducer,
});

export default rootReducer;