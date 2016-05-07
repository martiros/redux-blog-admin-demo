import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchArticlesIfNeeded } from '../actions/articles';
import { Link } from 'react-router';
import Spinner from '../components/widgets/Spinner';

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
                <i className="glyphicon glyphicon-plus" ></i> Add new article
              </Link>
            </h1>
          </div>

          <div>
            {!loading && items.map(article => (
              <li className="list-group-item" key={article.id} >
                <Link to={`/articles/${article.id}`} >{article.title}</Link>
              </li>
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

export default connect(mapStateToProps, { fetchArticlesIfNeeded })(ArticlesList);

export { ArticlesList };
