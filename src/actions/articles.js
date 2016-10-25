import { normalize } from 'normalizr';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { push } from 'react-router-redux';
import http from '../utils/http';
import {
  REQUEST_ARTICLES,
  REQUEST_ARTICLES_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
  DELETE_ARTICLE,
} from '../constants/actionTypes';
import { receiveEntities } from './entities';
import Schemas from '../schemas';

function processValidationErrors(result, formData) {
  return Promise.reject(
    result.errors.reduce((formErrors, error) => {
      let key;
      let message;
      if (formData[error.path]) {
        key = error.path;
        message = error.message;
      } else if (formErrors._error) {
        key = '_error';
        message = `${formErrors._error}, ${error.message}`;
      } else {
        key = '_error';
        message = error.message;
      }

      return {
        ...formErrors,
        [key]: message,
      };
    }, {})
  );
}

function handleRequestFail(err, formData) {
  const { response } = err;
  if (response.status === UNPROCESSABLE_ENTITY) {
    return processValidationErrors(response.body, formData);
  }

  // @TODO: Handle global errors !!!!
  return null;
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
      .then((res) => {
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

export function addArticleSucceed() {
  return {
    type: CREATE_ARTICLE_SUCCESS,
  };
}

export function addArticle(formData) {
  return dispatch =>
    http
      .post('/api/articles', formData)
      .then((result) => {
        const data = normalize(result.body.item, Schemas.ARTICLE);

        dispatch(receiveEntities(data.entities));
        dispatch(addArticleSucceed());


        dispatch(push(`/articles/${data.result}`));
        window.scrollTo(0, 0);
      })
      .catch(err => handleRequestFail(err, formData));
}

export function updateArticle(id, formData) {
  return dispatch =>
    http
      .put(`/api/articles/${id}`, formData)
      .then((result) => {
        const data = normalize(result.body.item, Schemas.ARTICLE);
        dispatch(receiveEntities(data.entities));
      })
      .catch(err => handleRequestFail(err, formData));
}

export function deleteArticle(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_ARTICLE,
      id,
    });

    return http
      .delete(`/api/articles/${id}`)
      .catch(err => handleRequestFail(err));
  };
}
