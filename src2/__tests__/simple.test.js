import React from 'react';
import { shallow } from 'enzyme';

import parser from '../';

describe('create simple tag', () => {
  it('should parse [b]strong[/b] to react <strong>strong</strong>', () => {
    const wrapper = shallow(<div>{parser.toReact('[b]strong[/b]')}</div>);

    expect(wrapper.text()).toBe('strong');
    expect(wrapper.html()).toBe('<div><strong>strong</strong></div>');
  });

  it('should parse nest b', () => {
    const wrapper = shallow(<div>{parser.toReact('[b]an inner [b]strong[/b].[/b]')}</div>);

    expect(wrapper.text()).toBe('an inner strong.');
    expect(wrapper.html()).toBe('<div><strong>an inner <strong>strong</strong>.</strong></div>');
  });

  it('should parse "[i]italic[/i]"" to react "<em>italic</em>"', () => {
    const wrapper = shallow(<div>{parser.toReact('[i]italic[/i]')}</div>);

    expect(wrapper.text()).toBe('italic');
    expect(wrapper.html()).toBe('<div><em>italic</em></div>');
  });

  it('should parse "[h1]header1[/h1]"" to react "<h1>header1</h1>"', () => {
    const wrapper = shallow(<div>{parser.toReact('[h1]header1[/h1]')}</div>);

    expect(wrapper.text()).toBe('header1');
    expect(wrapper.html()).toBe('<div><h1>header1</h1></div>');
  });

  it('should parse table to react', () => {
    const bbcode = `[table]
        [tbody]
          [tr]
            [td]1.1[/td]
            [td]1.2[/td]
          [/tr]
        [/tbody]
      [/table]`;
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>);

    expect(wrapper.text()).toBe('1.11.2');
    expect(wrapper.html()).toBe('<div><table><tbody><tr><td>1.1</td><td>1.2</td></tr></tbody></table></div>');
  });

  it('should not render text with DISCARD_TEXT option', () => {
    const wrapper = shallow(<div>{parser.toReact('[table]italic[/table]')}</div>);

    expect(wrapper.text()).toBe('');
    expect(wrapper.html()).toBe('<div><table></table></div>');
  });

  it.only('should strip outer with STRIP_OUTER option', () => {
    const bbcode = `[h1]header[/h1]
newline`;
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>);

    expect(wrapper.text()).toBe('headernewline');
    expect(wrapper.html()).toBe('<div><h1>header</h1>newline</div>');
  });

  it('should not strip outer with STRIP_OUTER option', () => {
    const bbcode = `[b]strong[/b]
newline`;
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>);

    expect(wrapper.text()).toBe('strong newline');
    expect(wrapper.html()).toBe('<div><strong>strong</strong>\nnewline</div>');
  });

});
