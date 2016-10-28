import React from 'react';
import { shallow } from 'enzyme';

import parser from '../';

describe('[size]', () => {
  it('should parse [size] to react', () => {
    const bbcode = '[size=5]size5[/size]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('size5');
    expect(wrapper.prop('style').fontSize).toBe('5px');
  });
});
