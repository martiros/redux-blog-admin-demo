import { RECEIVE_ENTITIES } from '../constants/actionTypes';

export function receiveEntities(entities) {
  return {
    type: RECEIVE_ENTITIES,
    entities,
  };
}
