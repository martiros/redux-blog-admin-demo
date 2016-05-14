import { expect } from 'chai';
import entitiesReducer from './../../reducers/entities';
import { RECEIVE_ENTITIES, DELETE_ARTICLE } from './../../constants/actionTypes';

describe('reducers/entities', () => {
  it('should return the initial state', () => {
    expect(
      entitiesReducer(undefined, {})
    ).to.be.deep.equal({ articles: {} });
  });

  it('should handle RECEIVE_ENTITIES', () => {
    const state = {
      someData: {},
      articles: {
        3: {
          id: 3,
          title: 'foo',
        },
        6: {
          id: 6,
          title: 'bar',
        },
      },
    };

    const action = {
      type: RECEIVE_ENTITIES,
      entities: {
        articles: {
          2: {
            id: 2,
            title: 'baz',
          },
          6: {
            id: 6,
            content: 'bar content',
          },
        },
      },
    };

    const expectedState = {
      someData: {},
      articles: {
        2: {
          id: 2,
          title: 'baz',
        },
        3: {
          id: 3,
          title: 'foo',
        },
        6: {
          id: 6,
          title: 'bar',
          content: 'bar content',
        },
      },
    };

    expect(entitiesReducer(state, action)).to.be.deep.equal(expectedState);
  });

  it('should handle DELETE_ARTICLE', () => {
    const state = {
      someData: {},
      articles: {
        2: {
          id: 2,
          title: 'baz',
        },
        3: {
          id: 3,
          title: 'foo',
        },
        6: {
          id: 6,
          title: 'bar',
          content: 'bar content',
        },
      },
    };

    const action = {
      type: DELETE_ARTICLE,
      id: 3,
    };

    const expectedState = {
      someData: {},
      articles: {
        2: {
          id: 2,
          title: 'baz',
        },
        6: {
          id: 6,
          title: 'bar',
          content: 'bar content',
        },
      },
    };

    expect(entitiesReducer(state, action)).to.be.deep.equal(expectedState);
  });
});
