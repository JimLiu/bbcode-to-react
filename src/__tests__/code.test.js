import React from 'react';
import { shallow } from 'enzyme';

import parser from '../';

describe('[code]', () => {
  it('should parse "[code=inline][b]strong[/b][/code]" to react', () => {
    const wrapper = shallow(<div>{parser.toReact('[code=inline][b]strong[/b][/code]')}</div>);

    expect(wrapper.text()).toBe('[b]strong[/b]');
    expect(wrapper.html()).toBe('<div><code>[b]strong[/b]</code></div>');
  });

  it('should parse "[code][b]strong[/b][/code]" to react', () => {
    const wrapper = shallow(<div>{parser.toReact('[code][b]strong[/b][/code]')}</div>);

    expect(wrapper.text()).toBe('[b]strong[/b]');
    expect(wrapper.children().first().type()).toBe('pre');
  });
});
