import { expect } from 'chai';
import nock from 'nock';
import _ from 'lodash';
import {
  requestArticles,
  requestArticlesSuccess,
  fetchArticles,
  fetchArticlesIfNeeded,
} from '../../actions/articles';
import {
  REQUEST_ARTICLES,
  REQUEST_ARTICLES_SUCCESS,
  RECEIVE_ENTITIES,
} from '../../constants/actionTypes';
import mockStore from '../utils/mockStore';

describe('actions/articles', () => {
  it('should create an action to request articles', () => {
    expect(requestArticles()).to.deep.equal({
      type: REQUEST_ARTICLES,
    });
  });

  it('should create an action to receive articles after request success', () => {
    const articles = [4, 5, 90];
    expect(requestArticlesSuccess(articles)).to.deep.equal({
      type: REQUEST_ARTICLES_SUCCESS,
      articles,
    });
  });

  it('creates REQUEST_ARTICLES_SUCCESS actions when fetching articles has been done', () => {
    const articles = {
      1: {
        id: 1,
        title: 'foo',
      },
      3: {
        id: 3,
        title: 'bar',
      },
    };

    nock('http://localhost')
      .get('/api/articles')
      .reply(200, { items: _.values(articles) });

    const expectedActions = [
      { type: REQUEST_ARTICLES },
      { type: RECEIVE_ENTITIES, entities: { articles } },
      { type: REQUEST_ARTICLES_SUCCESS, articles: [1, 3] },
    ];

    const store = mockStore({
      entities: {},
      articles: {
        loading: false,
        requested: false,
        requestErrors: [],
        items: [],
      },
    });

    return store.dispatch(fetchArticles())
      .then(() => {
        expect(store.getActions()).deep.equal(expectedActions);
      });
  });

  it('doesn\'t requests articles if they already was requested', () => {
    const store = mockStore({
      entities: {
        articles: {
          1: {
            id: 1,
            title: 'foo',
          },
        },
      },
      articles: {
        loading: false,
        requested: true,
        requestErrors: [],
        items: [1],
      },
    });

    store.dispatch(fetchArticlesIfNeeded());

    expect(store.getActions()).deep.equal([]);
  });
});
