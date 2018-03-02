// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
import React from 'react';
import Tag from '../tag';

export default class ListTag extends Tag {

  constructor(renderer, settings = {}) {
    super(renderer, settings);

    this.STRIP_INNER = true;
    this.STRIP_OUTER = true;
  }

  toHTML() {
    const listType = this.params.list;

    if (listType === '1') {
      return ['<ol>', this.getContent(), '</ol>'];
    }

    if (listType === 'a') {
      return ['<ol style="list-style-type:lower-alpha;">', this.getContent(), '</ol>'];
    }

    if (listType === 'A') {
      return ['<ol style="list-style-type:upper-alpha;">', this.getContent(), '</ol>'];
    }

    return ['<ul>', this.getContent(), '</ul>'];
  }

  toReact() {
    const listType = this.params.list;

    const listTypes = {
      a: 'lower-alpha',
      A: 'upper-alpha',
      i: 'lower-roman',
      I: 'upper-roman',
      '1': 'decimal',
    }

    if (listTypes[listType]) {
      return (
        <ol
          style={{
            listStyleType: listTypes[listType],
          }}
        >
          {this.getComponents()}
        </ol>
      );
    }

    return <ul>{this.getComponents()}</ul>;
  }
}

