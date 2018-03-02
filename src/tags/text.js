const React = require('react');

class TextTag {
  constructor(text) {
    this.text = text;
    this.isText = true;
  }

  toHtml() {
    return this.text;
  }

  toReact() {
    return this.text;
  }
}

module.exports = TextTag;
