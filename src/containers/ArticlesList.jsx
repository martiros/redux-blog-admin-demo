import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchArticlesIfNeeded, deleteArticle } from '../actions/articles';
import { Link } from 'react-router';
import Spinner from '../components/widgets/Spinner';
import ArticlesListItem from '../components/ArticlesListItem';
import Icon from '../components/widgets/Icon';

class ArticlesList extends Component {
  componentWillMount() {
    this.props.fetchArticlesIfNeeded();
  }

  render() {
    const {
      articles: {
        items,
        loading,
      },
    } = this.props;

    return (
      <div className="container">
        <div>
          <div>
            <h1 id="glyphicons" className="page-header">
              Articles
              <Link className="btn btn-primary pull-right" to="/articles/create" >
                <Icon icon="plus" /> Add new article
              </Link>
            </h1>
          </div>

          <div>
            {!loading && !items.length && (
              <div className="alert alert-warning text-center">
                There are no articles! You can add new article&nbsp;
                <Link to="/articles/create" >here</Link>.
              </div>
            )}

            {!loading && items.map(article => (
              <ArticlesListItem
                key={article.id}
                article={article}
                onDelete={this.props.deleteArticle}
              />
            ))}

            {loading &&
              <Spinner />
            }
          </div>
        </div>
      </div>
    );
  }
}

ArticlesList.propTypes = {
  fetchArticlesIfNeeded: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  articles: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    requested: PropTypes.bool.isRequired,
    requestErrors: PropTypes.bool.isArray,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

function mapStateToProps(state) {
  const allArticles = state.entities.articles;
  const articles = {
    ...state.articles,
    items: state.articles.items.map((articleId) => allArticles[articleId]),
  };
  return {
    articles,
  };
}

export default connect(mapStateToProps, { fetchArticlesIfNeeded, deleteArticle })(ArticlesList);

export { ArticlesList };
