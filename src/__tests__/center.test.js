import React from 'react';
import { shallow } from 'enzyme';

import BBCode from '../';

const bbcode = new BBCode();

describe('[center]', () => {
  it('should parse [center] to react', () => {
    const code = '[center]center[/center]';
    const wrapper = shallow(<div>{bbcode.toReact(code)}</div>).children().first();

    expect(wrapper.text()).toBe('center');
    expect(wrapper.prop('style').textAlign).toBe('center');
  });
});
