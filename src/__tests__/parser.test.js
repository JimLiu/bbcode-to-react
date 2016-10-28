import React from 'react';
import { shallow } from 'enzyme';

import parser from '../';

describe('parser', () => {
  it('should parse bbcode to react', () => {
    const wrapper = shallow(<div>{parser.toReact('[b]strong[/b]')}</div>);

    expect(wrapper.text()).toBe('strong');
    expect(wrapper.html()).toBe('<div><strong>strong</strong></div>');
  });
});
