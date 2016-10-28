import React from 'react';
import { shallow } from 'enzyme';

import parser from '../';

describe('[list]', () => {
  it('should parse [list] to react', () => {
    const bbcode = '[list]list[/list]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('list');
    expect(wrapper.type()).toBe('ul');
  });

  it('should parse [list=a] to react', () => {
    const bbcode = '[list=a]list[/list]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('list');
    expect(wrapper.type()).toBe('ol');
    expect(wrapper.prop('style').listStyleType).toBe('lower-alpha');
  });


  it('should parse [list=A] to react', () => {
    const bbcode = '[list=A]list[/list]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('list');
    expect(wrapper.type()).toBe('ol');
    expect(wrapper.prop('style').listStyleType).toBe('upper-alpha');
  });

  it('should parse [list=1] to react', () => {
    const bbcode = '[list=1]list[/list]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('list');
    expect(wrapper.type()).toBe('ol');
  });

  it('should parse [*]item[/*] to react', () => {
    const bbcode = '[*]item[/*]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('item');
    expect(wrapper.type()).toBe('li');
  });

  it('should parse list with items', () => {
    const bbcode = `[list]
      [*]item1[/*]
      [*]item2[/*]
      [*]item3[/*]
    [/list]`;
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.type()).toBe('ul');
    expect(wrapper.find('li').length).toBe(3);
    expect(wrapper.find('li').first().type()).toBe('li');
    expect(wrapper.find('li').first().text()).toBe('item1');
  });
});
