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

  it('should parse [email]no.one@domain.adr[/email] to react', () => {
    const bbcode = '[email]no.one@domain.adr[/email]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('no.one@domain.adr');
    expect(wrapper.prop('href')).toBe('mailto:no.one@domain.adr');
  });

  it('should parse image link to react', () => {
    const bbcode = '[url=https://github.com/JimLiu/bbcode-to-react]bbcode-to-react][img]logo.png[/img][/url]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.type()).toBe('a');
    expect(wrapper.prop('href')).toBe('https://github.com/JimLiu/bbcode-to-react');
    expect(wrapper.find('img').first().type()).toBe('img');
    expect(wrapper.find('img').first().prop('src')).toBe('logo.png');
  });
});
