const React = require('react');

const Tag = require('../tag');

export default class ColorTag extends Tag {
  toHtml() {
    if (!this.selfClose && !this.isClosed) {
      return this.outerText;
    }

    const color = this.attribute || 'black';

    return `<div style="color:${color};">${this.getInnerHtml()}</div>`;
  }

  toReact() {
    if (!this.selfClose && !this.isClosed) {
      return this.outerText;
    }

    const color = this.attribute || 'black';

    return (
      <div style={{ color }}>
        {this.getReactChildren()}
      </div>
    );
  }
}
