// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
import React from 'react';
import Tag from '../tag';

export default class SizeTag extends Tag {

  toHTML() {
    const size = this.params.size;

    if (isNaN(size)) {
      return this.getContent();
    }
    return [`<span style="font-size:${size}px">`, this.getContent(), '</span>'];
  }

  toReact() {
    const size = this.params.size;

    if (isNaN(size)) {
      return this.getComponents();
    }

    return (
      <span style={{ fontSize: `${size}px` }}>{this.getComponents()}</span>
    );
  }
}

