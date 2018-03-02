import React from 'react';
import { shallow } from 'enzyme';

import BBCode from '../';

const bbcode = new BBCode();

describe('create tag that is not case-sensitive', () => {
  it('should parse [b]strong[/b] to react <strong>strong</strong>', () => {
    const wrapper = shallow(<div>{bbcode.toReact('[b]strong[/b]')}</div>);

    expect(wrapper.text()).toBe('strong');
    expect(wrapper.html()).toBe('<div><strong>strong</strong></div>');
  });

  it('should parse [B]strong[/B] to react <strong>strong</strong>', () => {
    const wrapper = shallow(<div>{bbcode.toReact('[B]strong[/B]')}</div>);

    expect(wrapper.text()).toBe('strong');
    expect(wrapper.html()).toBe('<div><strong>strong</strong></div>');
  });


  it('should parse [B]strong[/b] to react <strong>strong</strong>', () => {
    const wrapper = shallow(<div>{bbcode.toReact('[B]strong[/b]')}</div>);

    expect(wrapper.text()).toBe('strong');
    expect(wrapper.html()).toBe('<div><strong>strong</strong></div>');
  });

  it('should NOT parse [c]strong[/c] to react <strong>strong</strong>', () => {
    const wrapper = shallow(<div>{bbcode.toReact('[c]strong[/c]')}</div>);

    expect(wrapper.text()).toBe('[c]strong[/c]');
    expect(wrapper.html()).toBe('<div>[c]strong[/c]</div>');
  });
});
