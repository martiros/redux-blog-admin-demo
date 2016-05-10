import { expect } from 'chai';
import nock from 'nock';
import sinon from 'sinon';
import _ from 'lodash';
import {
  requestArticles,
  requestArticlesSuccess,
  fetchArticles,
  fetchArticlesIfNeeded,
  addArticle,
  addArticleSucceed,
  updateArticle,
} from '../../actions/articles';
import { receiveEntities } from '../../actions/entities';
import {
  REQUEST_ARTICLES,
  REQUEST_ARTICLES_SUCCESS,
  RECEIVE_ENTITIES,
} from '../../constants/actionTypes';
import mockStore from '../utils/mockStore';
import { push } from 'react-router-redux';

describe('actions/articles', () => {
  let windowStub;

  before(() => {
    global.window = {
      scrollTo: () => {},
    };
    windowStub = sinon.stub(global.window, 'scrollTo');
  });

  afterEach(() => windowStub.reset());

  after(() => {
    windowStub.restore();
    global.window = undefined;
  });

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

  it('should handle add article action', () => {
    const articlePostData = {
      title: 'test title',
      content: 'test content',
    };

    const newArticleData = {
      id: 34,
      ...articlePostData,
    };

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

    nock('http://localhost')
      .post('/api/articles', articlePostData)
      .reply(201, {
        item: newArticleData,
      });

    const expectedActions = [
      receiveEntities({
        articles: {
          [newArticleData.id]: newArticleData,
        },
      }),
      addArticleSucceed(),
      push(`/articles/${newArticleData.id}`),
    ];

    return store.dispatch(addArticle(articlePostData)).then(() => {
      expect(store.getActions()).deep.equal(expectedActions);
    });
  });

  it('should handle update article action', () => {
    const article = {
      id: 32,
      title: 'test title',
      content: 'test content',
    };

    const updateArticleData = {
      title: 'updated test title',
      content: 'updated test content',
    };

    const updatedArticle = {
      ...article,
      ...updateArticleData,
    };

    const storeInitialState = {
      entities: {
        articles: {
          1: {
            id: 1,
            title: 'foo',
          },
          [article.id]: article,
          234: {
            id: 234,
            title: 'bar',
          },
        },
      },
      articles: {
        loading: false,
        requested: true,
        requestErrors: [],
        items: [1, article.id, 234],
      },
    };

    const store = mockStore(storeInitialState);

    nock('http://localhost')
      .put(`/api/articles/${article.id}`, updateArticleData)
      .reply(200, {
        item: updatedArticle,
      });

    const expectedActions = [
      receiveEntities({
        articles: {
          [updatedArticle.id]: updatedArticle,
        },
      }),
    ];

    return store.dispatch(updateArticle(article.id, updateArticleData)).then(() => {
      expect(store.getActions()).deep.equal(expectedActions);
    });
  });
});
