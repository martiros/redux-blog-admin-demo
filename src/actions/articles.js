import http from '../utils/http';
import {
  REQUEST_ARTICLES,
  REQUEST_ARTICLES_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
} from '../constants/actionTypes';
import { normalize } from 'normalizr';
import { receiveEntities } from './entities';
import Schemas from '../schemas';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { push } from 'react-router-redux';


function processValidationErrors(result, formData) {
  // @TODO: Change with higher order functions!
  const formErrors = {};
  for (let i = 0; i < result.errors.length; i++) {
    const error = result.errors[i];
    if (formData[error.path]) {
      formErrors[error.path] = error.message;
    } else if (formErrors._error) {
      formErrors._error += `, ${error.message}`;
    } else {
      formErrors._error = error.message;
    }
  }
  return Promise.reject(formErrors);
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

export function addArticleSucceed() {
  return {
    type: CREATE_ARTICLE_SUCCESS,
  };
}

export function addArticle(formData) {
  return (dispatch) =>
    http
      .post('/api/articles', formData)
      .then(result => {
        const data = normalize(result.body.item, Schemas.ARTICLE);

        dispatch(receiveEntities(data.entities));
        dispatch(addArticleSucceed());


        dispatch(push(`/articles/${data.result}`));
        window.scrollTo(0, 0);
      })
      .catch((err) => handleRequestFail(err, formData));
}

export function updateArticle(id, formData) {
  return (dispatch) =>
    http
      .put(`/api/articles/${id}`, formData)
      .then(result => {
        const data = normalize(result.body.item, Schemas.ARTICLE);
        dispatch(receiveEntities(data.entities));
      })
      .catch(err => handleRequestFail(err, formData));
}
