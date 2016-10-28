import React from 'react';
import { shallow } from 'enzyme';

import parser from '../';

describe('[center]', () => {
  it('should parse [center] to react', () => {
    const bbcode = '[center]center[/center]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('center');
    expect(wrapper.prop('style').textAlign).toBe('center');
  });
});
