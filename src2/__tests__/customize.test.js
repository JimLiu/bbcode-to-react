import React from 'react';
import { shallow } from 'enzyme';

import parser, { Tag } from '../';

class YoutubeTag extends Tag {
  toReact() {
    // using this.getContent(true) to get it's inner raw text.
    const attributes = {
      src: this.getContent(true),
      width: this.params.width || 420,
      height: this.params.height || 315,
    };
    return (
      <iframe
        {...attributes}
        frameBorder="0"
        allowFullScreen
      />
    );
  }
}

class BoldTag extends Tag {
  toReact() {
    // using this.getComponents() to get children components.
    return (
      <b>{this.getComponents()}</b>
    );
  }
}

parser.registerTag('youtube', YoutubeTag); // add new tag
parser.registerTag('b', BoldTag); // replace exists tag

describe('customize tag', () => {
  it('should parse customize youtube tag to react', () => {
    const bbcode = '[youtube width="400"]https://www.youtube.com/watch?v=AB6RjNeDII0[/youtube]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('');
    expect(wrapper.type()).toBe('iframe');
    expect(wrapper.prop('src')).toBe('https://www.youtube.com/watch?v=AB6RjNeDII0');
    expect(wrapper.prop('width').toString()).toBe('400');
    expect(wrapper.prop('height').toString()).toBe('315');
    expect(wrapper.prop('frameBorder').toString()).toBe('0');
    expect(wrapper.prop('allowFullScreen')).toBe(true);
  });

  it('should replace the exist tag', () => {
    const bbcode = '[b]strong[/b]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('strong');
    expect(wrapper.type()).toBe('b');
    expect(wrapper.html()).toBe('<b>strong</b>');
  });
});
