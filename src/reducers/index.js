import { combineReducers } from 'redux';
import { routeReducer as routing } from 'redux-simple-router';
import entities from './entities';
import articles from './articles';

export default combineReducers({
  routing,
  entities,
  articles,
});
