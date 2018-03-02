const React = require('react');

const Tag = require('../tag');

class UrlTag extends Tag {
  toHtml() {
    if (!this.selfClose && !this.isClosed) {
      return this.outerText;
    }

    const urlInput = this.attribute ? this.attribute : this.getInnerHtml();
    const url = this.linkify(urlInput.trim());

    if (!url) {
      return this.outerText;
    }

    return `<a href="${url}" target="blank">${urlInput}</a>`;
  }

  toReact() {
    if (!this.selfClose && !this.isClosed) {
      return this.outerText;
    }

    const urlInput = this.attribute ? this.attribute : this.getInnerHtml();
    const url = this.linkify(urlInput.trim());

    if (!url) {
      return this.outerText;
    }

    return <a href={url}>{this.getReactChildren()}</a>;
  }
}

module.exports = UrlTag;
