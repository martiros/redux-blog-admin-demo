import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from './widgets/Icon';

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
        <button onClick={this.deleteArticle} className="pull-right" >
          <Icon icon="remove" />
        </button>
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
