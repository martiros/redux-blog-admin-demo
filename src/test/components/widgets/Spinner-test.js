import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Spinner from './../../../components/widgets/Spinner';

describe('components/widgets/Spinner', () => {
  it('should render correctly', () => {
    expect(shallow(<Spinner />)).to.have.length(1);
  });
});
