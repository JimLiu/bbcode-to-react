import React from 'react';
import { shallow } from 'enzyme';

import parser from '../';

describe('[quote]', () => {
  it('should parse "[quote]quote[/quote]" to react', () => {
    const bbcode = '[quote]quote[/quote]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('quote');
    expect(wrapper.type()).toBe('blockquote');
  });

  it('should parse quote with author', () => {
    const bbcode = '[quote="Mr. Blobby"]The text Mr. Blobby wrote would go here[/quote]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('Mr. Blobby wrote:The text Mr. Blobby wrote would go here');
    expect(wrapper.type()).toBe('blockquote');
  });
});
