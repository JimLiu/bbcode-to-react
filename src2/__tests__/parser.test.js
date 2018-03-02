// http://www.react.org.au/forum/faq.php?mode=bbcode

import React from 'react';
import { shallow } from 'enzyme';

import parser from '../';

describe('parser', () => {
  it('should parse bbcode to react', () => {
    const bbcode = '[b]strong[/b]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('strong');
    expect(wrapper.html()).toBe('<strong>strong</strong>');
  });

  it('should encode html', () => {
    const bbcode = '[b]<strong>strong</strong>[/b]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('<strong>strong</strong>');
    expect(wrapper.html()).toBe('<strong>&lt;strong&gt;strong&lt;/strong&gt;</strong>');
  });
});
