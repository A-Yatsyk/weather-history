import { combineReducers } from 'redux';
import nav from './nav';
import weather from './weather';

export default combineReducers({
  nav,
  weather,
});
