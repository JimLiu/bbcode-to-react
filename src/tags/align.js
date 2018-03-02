const React = require('react');

const Tag = require('../tag');

const createAlignTag = (name) => {
  class AlignTag extends Tag {
    toHtml() {
      if (!this.selfClose && !this.isClosed) {
        return this.outerText;
      }

      return `<div style="text-align:${name};">${this.getInnerHtml()}</div>`;
    }

    toReact() {
      if (!this.selfClose && !this.isClosed) {
        return this.outerText;
      }

      return (
        <div style={{ textAlign: name }}>
          {this.getReactChildren()}
        </div>
      );
    }
  }
  return AlignTag;
};

module.exports = createAlignTag;
