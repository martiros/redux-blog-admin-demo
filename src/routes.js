import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import ArticlesList from './containers/ArticlesList';
import { AddArticle, EditArticle } from './containers/ArticleEditor';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="articles" component={ArticlesList} />
    <Route path="articles/create" component={AddArticle} />
    <Route path="articles/:id" component={EditArticle} />
  </Route>
);
