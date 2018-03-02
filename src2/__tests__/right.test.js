import React from 'react';
import { shallow } from 'enzyme';

import parser from '../';

describe('[right]', () => {
  it('should parse [right] to react', () => {
    const bbcode = '[right]right[/right]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('right');
    expect(wrapper.prop('style').textAlign).toBe('right');
  });
});
