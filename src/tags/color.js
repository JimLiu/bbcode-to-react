// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
import React from 'react';
import Tag from '../tag';

export default class ColorTag extends Tag {

  toHTML() {
    const color = this.params.color;

    if (!color) {
      return this.getContent();
    }

    return [`<span style="color:${color}">`, this.getContent(), '</span>'];
  }

  toReact() {
    const color = this.params.color;

    if (!color) {
      return this.getComponents();
    }

    return (
      <span style={{ color }}>
        {this.getComponents()}
      </span>
    );
  }
}

