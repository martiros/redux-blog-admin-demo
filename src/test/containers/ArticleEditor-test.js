import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ArticleEditor from './../../containers/ArticleEditor';

describe('components/ArticleEditor', () => {
  const defaultProps = {
    fields: {
      title: {
        value: '',
        initialValue: '',
        touched: false,
        onChange: () => {},
      },
      content: {
        value: '',
        initialValue: '',
        touched: false,
        onChange: () => {},
      },
    },
    error: null,
    resetForm: () => {},
    submitting: false,
    loading: false,
    requested: false,
    requestErrors: [],
    notFound: false,
    handleSubmit: () => {},
    fetchArticlesIfNeeded: () => {},
  };

  it('should render correctly', () => {
    expect(shallow(<ArticleEditor {...defaultProps} />)).to.have.length(1);
  });

  it('shows spinner if data is loading', () => {
    const props = {
      ...defaultProps,
      loading: true,
    };

    const wrapper = shallow(<ArticleEditor {...props} />);
    expect(wrapper.find('Spinner')).to.have.length(1);
    expect(wrapper.find('NotFound')).to.have.length(0);
    expect(wrapper.find('.form-horizontal')).to.have.length(0);
  });

  it('shows not found error page if data is not found', () => {
    const props = {
      ...defaultProps,
      notFound: true,
    };

    const wrapper = shallow(<ArticleEditor {...props} />);
    expect(wrapper.find('Spinner')).to.have.length(0);
    expect(wrapper.find('NotFound')).to.have.length(1);
    expect(wrapper.find('.form-horizontal')).to.have.length(0);
  });

  it('shows form when data is loaded', () => {
    const props = {
      ...defaultProps,
      requested: true,
      loading: false,
      notFound: false,
    };

    const wrapper = shallow(<ArticleEditor {...props} />);
    expect(wrapper.find('Spinner')).to.have.length(0);
    expect(wrapper.find('NotFound')).to.have.length(0);
    expect(wrapper.find('.form-horizontal')).to.have.length(1);
  });
});
