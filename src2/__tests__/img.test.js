import React from 'react';
import { shallow } from 'enzyme';

import parser from '../';

describe('[img]', () => {
  it('should parse "[img]logo.png[/img]" to react', () => {
    const wrapper = shallow(<div>{parser.toReact('[img]logo.png[/img]')}</div>).children().first();

    expect(wrapper.text()).toBe('');
    expect(wrapper.type()).toBe('img');
    expect(wrapper.prop('src')).toBe('logo.png');
  });

  it('should has width and height "[img width="640" height="480"]logo.png[/img]" to react', () => {
    const wrapper = shallow(<div>{parser.toReact('[img width="640" height="480"]logo.png[/img]')}</div>).children().first();

    expect(wrapper.text()).toBe('');
    expect(wrapper.type()).toBe('img');
    expect(wrapper.prop('src')).toBe('logo.png');
    expect(wrapper.prop('width')).toBe('640');
    expect(wrapper.prop('height')).toBe('480');
  });
});
