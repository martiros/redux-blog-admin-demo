import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import ArticlesListItem from './../../components/ArticlesListItem';

describe('components/ArticlesListItem', () => {
  const defaultProps = {
    article: {
      id: 4,
      title: 'foo',
      content: 'bar',
    },
    onDelete: () => {},
  };

  it('should render correctly', () => {
    expect(shallow(<ArticlesListItem {...defaultProps} />)).to.have.length(1);
  });

  it('should handle delete button click', () => {
    const onDelete = sinon.spy();
    const props = {
      ...defaultProps,
      onDelete,
    };

    const wrapper = shallow(<ArticlesListItem {...props} />);

    wrapper.find('a').simulate('click');

    expect(onDelete.calledOnce).to.equal(true);
    expect(onDelete.calledWith(props.article.id)).to.equal(true);
  });
});
