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
    const bbcode = `[list=a]
[*]The first possible answer
[*]The second possible answer
[*]The third possible answer
[/list]`;
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.type()).toBe('ol');
    expect(wrapper.find('li').length).toBe(3);
    expect(wrapper.find('li').first().text().trim()).toBe('The first possible answer');
    expect(wrapper.prop('style').listStyleType).toBe('lower-alpha');
  });


  it('should parse [list=A] to react', () => {
    const bbcode = `[list=A]
[*]The first possible answer
[*]The second possible answer
[*]The third possible answer
[/list]`;
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.type()).toBe('ol');
    expect(wrapper.find('li').length).toBe(3);
    expect(wrapper.find('li').first().text().trim()).toBe('The first possible answer');
    expect(wrapper.prop('style').listStyleType).toBe('upper-alpha');
  });

  it('should parse [list=i] to react', () => {
    const bbcode = `[list=i]
[*]The first possible answer
[*]The second possible answer
[*]The third possible answer
[/list]`;
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.type()).toBe('ol');
    expect(wrapper.find('li').length).toBe(3);
    expect(wrapper.find('li').first().text().trim()).toBe('The first possible answer');
    expect(wrapper.prop('style').listStyleType).toBe('lower-roman');
  });


  it('should parse [list=I] to react', () => {
    const bbcode = `[list=I]
[*]The first possible answer
[*]The second possible answer
[*]The third possible answer
[/list]`;
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.type()).toBe('ol');
    expect(wrapper.find('li').length).toBe(3);
    expect(wrapper.find('li').first().text().trim()).toBe('The first possible answer');
    expect(wrapper.prop('style').listStyleType).toBe('upper-roman');
  });

  it('should parse [list=1] to react', () => {
    const bbcode = `[list=1]
[*]Go to the shops
[*]Buy a new computer
[*]Swear at computer when it crashes
[/list]`;
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.type()).toBe('ol');
    expect(wrapper.find('li').length).toBe(3);
    expect(wrapper.find('li').first().type()).toBe('li');
    expect(wrapper.prop('style').listStyleType).toBe('decimal');
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
