import React from 'react';
import Tag from '../tag';

export default (name, attributes) => {
  class SimpleTag extends Tag {
    constructor(renderer, settings = {}) {
      super(renderer, settings);

      Object.keys(attributes || {}).forEach(key => {
        this[key] = attributes[key];
      });
    }

    toHTML() {
      let htmlAttributes = this.renderer.htmlAttributes(this.params);

      if (htmlAttributes) {
        htmlAttributes = ` ${htmlAttributes}`;
      }

      return [`<${name}${htmlAttributes}>`, this.getContent(), `</${name}>`];
    }

    toReact() {
      const Name = name;
      return (
        <Name {...this.params}>{this.getComponents()}</Name>
      );
    }

  }
  return SimpleTag;
};
