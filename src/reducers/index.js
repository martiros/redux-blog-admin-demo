import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import entities from './entities';
import articles from './articles';

export default combineReducers({
  routing,
  form: formReducer,
  entities,
  articles,
});
