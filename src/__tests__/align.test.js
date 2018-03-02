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

describe('[left]', () => {
  it('should parse [left] to react', () => {
    const code = '[left]left[/left]';
    const wrapper = shallow(<div>{bbcode.toReact(code)}</div>).children().first();

    expect(wrapper.text()).toBe('left');
    expect(wrapper.prop('style').textAlign).toBe('left');
  });
});

describe('[right]', () => {
  it('should parse [right] to react', () => {
    const code = '[right]right[/right]';
    const wrapper = shallow(<div>{bbcode.toReact(code)}</div>).children().first();

    expect(wrapper.text()).toBe('right');
    expect(wrapper.prop('style').textAlign).toBe('right');
  });
});
