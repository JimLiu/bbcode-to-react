// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
import React from 'react';
import Tag from '../tag';

export default class QuoteTag extends Tag {

  constructor(renderer, settings = {}) {
    super(renderer, settings);

    this.STRIP_INNER = true;
    this.STRIP_OUTER = true;
  }

  toHTML() {
    const pieces = ['<blockquote>', this.getContent()];
    const citation = this.params.quote;

    if (citation) {
      pieces.push('<small>');
      pieces.push(citation);
      pieces.push('</small>');
    }

    pieces.push('</blockquote>');

    return pieces;
  }

  toReact() {
    const citation = this.params.quote;
    return (
      <blockquote>
        {citation && <small>{citation} wrote:</small>}
        {this.getComponents()}
      </blockquote>
    );
  }

}

