import http from '../utils/http';
import { REQUEST_ARTICLES, REQUEST_ARTICLES_SUCCESS } from '../constants/actionTypes';
import { normalize } from 'normalizr';
import { receiveEntities } from './entities';
import Schemas from '../schemas';

function handleRequestFail() {
  // @TODO: Handle global errors here
}

function shouldFetchArticles(state) {
  const articles = state.articles;
  if (articles.requested) {
    return false;
  }

  if (articles.loading) {
    return false;
  }

  return true;
}

export function requestArticles() {
  return {
    type: REQUEST_ARTICLES,
  };
}

export function requestArticlesSuccess(articlesIds) {
  return {
    type: REQUEST_ARTICLES_SUCCESS,
    articles: articlesIds,
  };
}

export function fetchArticles() {
  return (dispatch) => {
    dispatch(requestArticles());

    return http
      .get('/api/articles')
      .then(res => {
        const data = normalize(res.body.items, Schemas.ARTICLES_LIST);
        dispatch(receiveEntities(data.entities));
        dispatch(requestArticlesSuccess(data.result));
      })
      .catch(err => dispatch(handleRequestFail(err)));
  };
}

export function fetchArticlesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchArticles(getState())) {
      dispatch(fetchArticles());
    }
  };
}
