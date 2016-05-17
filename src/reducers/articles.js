import {
  REQUEST_ARTICLES,
  REQUEST_ARTICLES_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
  DELETE_ARTICLE,
} from './../constants/actionTypes';

const defaultState = {
  loading: false,
  requested: false,
  requestErrors: [],
  items: [],
};

export default function articlesReducer(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_ARTICLES:
      return {
        ...state,
        loading: true,
        requested: true,
        requestErrors: [],
      };

    case REQUEST_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        requested: true,
        requestErrors: [],
        items: action.articles,
      };

    case DELETE_ARTICLE:
      return {
        ...state,
        items: state.items.filter((articleId) => articleId !== action.id),
      };

    case CREATE_ARTICLE_SUCCESS:
      return { ...defaultState };

    default:
      return state;
  }
}
