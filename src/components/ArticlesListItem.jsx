import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ArticlesListItem extends Component {

  constructor() {
    super();
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  deleteArticle() {
    const { article } = this.props;
    this.props.onDelete(article.id);
  }

  render() {
    const { article } = this.props;

    return (
      <li className="list-group-item" key={article.id} >
        <Link to={`/articles/${article.id}`} >{article.title}</Link>
        <a href="#" onClick={this.deleteArticle} className="pull-right" >
          <i className="glyphicon glyphicon-remove" ></i>
        </a>
      </li>
    );
  }
}

ArticlesListItem.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ArticlesListItem;
