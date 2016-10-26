import merge from 'lodash/merge';
import omit from 'lodash/omit';
import { RECEIVE_ENTITIES, DELETE_ARTICLE } from './../constants/actionTypes';

const defaultState = {
  articles: {},
};

export default function entitiesReducer(state = defaultState, action) {
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
