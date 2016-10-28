import React from 'react';
import { shallow } from 'enzyme';

import parser from '../';

describe('[url]', () => {

  it('should parse [url] to react', () => {
    const bbcode = '[url]https://github.com/JimLiu/bbcode-to-react[/url]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('https://github.com/JimLiu/bbcode-to-react');
    expect(wrapper.prop('href')).toBe('https://github.com/JimLiu/bbcode-to-react');
  });

  it('should parse [url=url]text[/url] to react', () => {
    const bbcode = '[url=https://github.com/JimLiu/bbcode-to-react]bbcode-to-react[/url]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('bbcode-to-react');
    expect(wrapper.prop('href')).toBe('https://github.com/JimLiu/bbcode-to-react');
  });
});
