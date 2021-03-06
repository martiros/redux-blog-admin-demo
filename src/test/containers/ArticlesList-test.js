import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { ArticlesList } from './../../containers/ArticlesList';

describe('components/ArticlesList', () => {
  const defaultProps = {
    fetchArticlesIfNeeded: () => {},
    deleteArticle: () => {},
    articles: {
      loading: false,
      requested: true,
      requestErrors: [],
      items: [
        {
          id: 1,
          title: 'foo',
          content: 'foo content',
        },
        {
          id: 4,
          title: 'bar',
          content: 'bar content',
        },
        {
          id: 12,
          title: 'baz',
          content: 'baz content',
        },
      ],
    },
  };

  it('should render correctly', () => {
    expect(shallow(<ArticlesList {...defaultProps} />)).to.have.length(1);
  });

  it('renders articles list', () => {
    const wrapper = shallow(<ArticlesList {...defaultProps} />);
    expect(wrapper.find('ArticlesListItem')).to.have.length(defaultProps.articles.items.length);
  });

  it('shows warning when articles list is empty', () => {
    const props = {
      ...defaultProps,
      articles: {
        ...defaultProps.articles,
        items: [],
      },
    };
    const wrapper = shallow(<ArticlesList {...props} />);

    expect(wrapper.find('.alert-warning')).to.have.length(1);
    expect(wrapper.find('ArticlesListItem')).to.have.length(0);
  });

  it('renders spinner when articles list is loading', () => {
    const props = {
      ...defaultProps,
      articles: {
        loading: true,
        requested: true,
        requestErrors: [],
        items: [],
      },
    };
    const wrapper = shallow(<ArticlesList {...props} />);
    expect(wrapper.find('li')).to.have.length(0);
    expect(wrapper.find('Spinner')).to.have.length(1);
  });
});
