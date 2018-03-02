import React from 'react';
import { shallow } from 'enzyme';

import parser from '../';

describe('combine formatting tags', () => {
  it('should parse [color] to react', () => {
    const bbcode = '[size=200][color=red][b]LOOK AT ME![/b][/color][/size]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('LOOK AT ME!');
    expect(wrapper.prop('style').fontSize).toBe('200px');
    expect(wrapper.children().first().prop('style').color).toBe('red');
    expect(wrapper.children().first().children().first().type()).toBe('strong');
  });

});
