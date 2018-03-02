const React = require('react');

const Tag = require('../tag');

class ImgTag extends Tag {
  toHtml() {
    if (!this.selfClose && !this.isClosed) {
      return this.outerText;
    }

    const urlInput = this.attribute ? this.attribute : this.getInnerHtml();
    const url = this.linkify(urlInput.trim());

    if (!url) {
      return this.outerText;
    }

    return `<img src="${url}" role="presentation" />`;
  }

  toReact() {
    if (!this.selfClose && !this.isClosed) {
      return this.outerText;
    }

    const urlInput = this.attribute ? this.attribute : this.getReactChildren();
    const url = this.linkify(urlInput);

    if (!url) {
      return this.outerText;
    }

    return <img src={url} role="presentation" />;
  }
}

module.exports = ImgTag;
