import { expect } from 'chai';
import { receiveEntities } from '../../actions/entities';
import { RECEIVE_ENTITIES } from '../../constants/actionTypes';

describe('actions/entities', () => {
  it('should create an action to receive entities', () => {
    const entities = {
      articles: [
        {
          id: 1,
          title: 'foo',
        },
        {
          id: 1,
          title: 'bar',
        },
      ],
    };
    const expectedAction = {
      type: RECEIVE_ENTITIES,
      entities,
    };

    expect(receiveEntities(entities)).to.deep.equal(expectedAction);
  });
});
