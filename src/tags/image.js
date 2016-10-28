// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
import React from 'react';
import Tag from '../tag';

export default class ImageTag extends Tag {

  toHTML() {
    const attributes = {
      src: this.renderer.strip(this.getContent(true)),
    };

    if (this.params.width) {
      attributes.width = this.params.width;
    }

    if (this.params.height) {
      attributes.height = this.params.height;
    }

    return `<img ${(this.renderer.htmlAttributes(attributes))} />`;
  }

  toReact() {
    const src = this.getContent(true);
    return (
      <img
        role="presentation"
        src={src}
        width={this.params.width}
        height={this.params.height}
      />
    );
  }
}

