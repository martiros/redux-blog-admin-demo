import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Spinner from './../components/widgets/Spinner';
import FormError from './../components/widgets/FormError';
import NotFound from './../components/NotFound';
import { fetchArticlesIfNeeded, addArticle, updateArticle } from '../actions/articles';

const ARTICLE_FIELDS = ['title', 'content'];

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title can\'t be blank';
  } else if (values.title.length > 200) {
    errors.title = 'Title is too long (maximum is 200 characters)';
  } else if (values.title.length < 10) {
    errors.title = 'Title is too small (minimum is 10 characters)';
  }

  if (!values.content) {
    errors.content = 'Content can\'t be blank';
  } else if (values.content.length > 60000) {
    errors.content = 'Content is too long (maximum is 60000 characters)';
  } else if (values.content.length < 50) {
    errors.content = 'Content is too small (minimum is 50 characters)';
  }

  return errors;
};

class ArticleEditor extends Component {

  componentWillMount() {
    if (this.props.fetchArticlesIfNeeded) {
      this.props.fetchArticlesIfNeeded();
    }
  }

  render() {
    const {
      fields: { title, content },
      error,
      handleSubmit,
      submitting,
      notFound,
      loading,
      resetForm,
    } = this.props;

    return ( // @TODO: Divide into small components
      <div className="container">
        <div>
          <div>
            <h1 id="glyphicons" className="page-header">
              Articles
              <Link className="btn btn-default pull-right" to="/articles" >
                <i className="glyphicon glyphicon-arrow-left" ></i> Back
              </Link>
            </h1>
          </div>
          <div>

            {loading &&
              <Spinner />
            }

            {notFound &&
              <NotFound />
            }

            {!notFound && !loading &&

              <form className="form-horizontal" onSubmit={handleSubmit}>

                {error &&
                <div className="alert alert-danger" role="alert">
                  <strong>Warning!</strong> {error}
                </div>
                }

                <div className={`form-group${(title.touched && title.error ? ' has-error' : '')}`}>
                  <label className="col-sm-2 control-label">Title</label>
                  <div className="col-sm-10">
                    <input type="title" className="form-control" placeholder="Title" {...title} />
                    <FormError field={title} />
                  </div>
                </div>

                <div
                  className={`form-group${(content.touched && content.error ? ' has-error' : '')}`}
                >
                  <label className="col-sm-2 control-label">Content</label>
                  <div className="col-sm-10">
                    <textarea
                      className="form-control"
                      placeholder="Content"
                      {...content}
                      value={content.value || ''}
                      rows="10"
                    />
                    <FormError field={content} />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button
                      className="btn btn-primary"
                      disabled={submitting}
                      onClick={handleSubmit}
                    >Submit</button>
                    {' '}
                    <button
                      className="btn btn-default"
                      disabled={submitting}
                      onClick={resetForm}
                    >Cancel</button>
                  </div>
                </div>

              </form>
            }
          </div>

        </div>
      </div>
    );
  }
}

ArticleEditor.propTypes = {
  fields: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool,
  requested: PropTypes.bool,
  requestErrors: PropTypes.array,
  notFound: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  fetchArticlesIfNeeded: PropTypes.func,
};

ArticleEditor.defaultProps = {
  notFound: false,
  requested: true,
  requestErrors: [],
  loading: false,
};

const AddArticle = reduxForm(
  {
    form: 'add-article',
    fields: ARTICLE_FIELDS,
    initialValues: {
      title: '',
      content: '',
    },
    validate,
  },
  null,
  (dispatch) => ({
    onSubmit: (formData) => dispatch(addArticle(formData)),
  })
)(ArticleEditor);

const EditArticle = reduxForm(
  {
    form: 'editArticle',
    fields: ARTICLE_FIELDS,
    validate,
  },
  (state, { params }) => { // @TODO: Check, refactor this big one!
    const id = params.id;
    const {
      articles,
      entities,
    } = state;

    if (!articles.requested) {
      return {
        formKey: `article-${id}`,
        loading: true,
        requested: false,
        requestErrors: [],
        initialValues: {},
      };
    }

    if (articles.loading) {
      return {
        formKey: `article-${id}`,
        loading: articles.loading,
        requested: articles.requested,
        requestErrors: [],
        initialValues: {},
      };
    }

    let initialValues = {};
    let notFound = true;
    if (entities.articles[id]) {
      initialValues = {
        title: entities.articles[id].title,
        content: entities.articles[id].content,
      };
      notFound = false;
    }

    return {
      formKey: `article-${id}`,
      loading: false,
      requested: true,
      requestErrors: articles.requestErrors,
      notFound,
      initialValues,
    };
  },
  (dispatch, { params }) => ({
    onSubmit: (formData) => dispatch(updateArticle(params.id, formData)),
    fetchArticlesIfNeeded: () => dispatch(fetchArticlesIfNeeded()),
  })
)(ArticleEditor);

export default ArticleEditor;

export { AddArticle, EditArticle };
