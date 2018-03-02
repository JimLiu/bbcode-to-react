import React from 'react';
import { shallow } from 'enzyme';

import parser from '../';

describe('[hr]', () => {
  it('should parse [hr] to react', () => {
    const wrapper = shallow(<div>{parser.toReact('[hr]')}</div>);

    expect(wrapper.text()).toBe('');
    expect(wrapper.html()).toBe('<div><hr/></div>');
  });
});
