import { RECEIVE_ENTITIES } from './../constants/actionTypes';
import merge from 'lodash/merge';

export default function entitiesReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ENTITIES:
      return merge({}, state, action.entities);

    default:
      return state;
  }
}
