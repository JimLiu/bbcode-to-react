const React = require('react');

const Tag = require('../tag');

export default (name) => {
  class SimpleTag extends Tag {
    toHTML() {
      if (!this.selfClose && !this.isClosed) {
        return this.outerText;
      }

      let htmlAttributes = this.renderAttributes();

      if (htmlAttributes) {
        htmlAttributes = ` ${htmlAttributes}`;
      }

      return `<${name}${htmlAttributes}>${this.getInnerHtml()}</${name}>`;
    }

    toReact() {
      if (!this.selfClose && !this.isClosed) {
        return this.outerText;
      }

      const Name = name;
      return (
        <Name {...this.attributes}>{this.getReactChildren()}</Name>
      );
    }
  }

  return SimpleTag;
};
