// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
import React from 'react';
import Tag from '../tag';

export default class ListItemTag extends Tag {

  constructor(renderer, settings = {}) {
    super(renderer, settings);

    this.CLOSED_BY = ['*', '/list'];
    this.STRIP_INNER = true;
  }

  toHTML() {
    return ['<li>', this.getContent(), '</li>'];
  }

  toReact() {
    return (
      <li>{this.getComponents()}</li>
    );
  }

}

