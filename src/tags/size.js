// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
import React from 'react';
import Tag from '../tag';

export default class SizeTag extends Tag {
  toHTML() {
    if (!this.selfClose && !this.isClosed) {
      return this.outerText;
    }

    const size = parseInt(this.attributes.size, 10);

    if (isNaN(size)) {
      return this.getInnerHtml();
    }

    return `<span style="font-size:${size}px">${this.getInnerHtml()}</span>`;
  }

  toReact() {
    if (!this.selfClose && !this.isClosed) {
      return this.outerText;
    }

    const size = parseInt(this.attributes.size, 10);

    if (isNaN(size)) {
      return this.getReactChildren();
    }

    return (
      <span style={{ fontSize: `${size}px` }}>{this.getReactChildren()}</span>
    );
  }
}

