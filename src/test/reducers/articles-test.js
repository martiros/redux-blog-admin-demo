import { expect } from 'chai';
import articlesReducer from './../../reducers/articles';
import { REQUEST_ARTICLES, REQUEST_ARTICLES_SUCCESS } from './../../constants/actionTypes';

describe('reducers/articles', () => {
  it('should return the initial state', () => {
    const defaultState = {
      loading: false,
      requested: false,
      requestErrors: [],
      items: [],
    };

    expect(articlesReducer(undefined, {})).to.be.deep.equal(defaultState);
  });

  it('should handle REQUEST_ARTICLES', () => {
    const state = {
      loading: false,
      requested: true,
      requestErrors: [{ msg: 'Some error object' }],
      items: [1, 4, 56],
    };

    const action = {
      type: REQUEST_ARTICLES,
    };

    const expectedState = {
      items: [1, 4, 56],
      loading: true,
      requested: true,
      requestErrors: [],
    };

    expect(articlesReducer(state, action)).to.be.deep.equal(expectedState);
  });

  it('should handle REQUEST_ARTICLES_SUCCESS', () => {
    const state = {
      loading: false,
      requested: true,
      requestErrors: [],
      items: [1, 4, 56],
    };

    const action = {
      type: REQUEST_ARTICLES_SUCCESS,
      articles: [1, 2, 12, 3],
    };

    const expectedState = {
      items: [1, 2, 12, 3],
      loading: false,
      requested: true,
      requestErrors: [],
    };

    expect(articlesReducer(state, action)).to.be.deep.equal(expectedState);
  });
});
