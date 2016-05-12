import { RECEIVE_ENTITIES, DELETE_ARTICLE } from './../constants/actionTypes';
import merge from 'lodash/merge';
import omit from 'lodash/omit';

export default function entitiesReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      return merge({}, state, action.entities);

    case DELETE_ARTICLE:
      return {
        ...state,
        articles: omit(state.articles, action.id),
      };

    default:
      return state;
  }
}
