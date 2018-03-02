const React = require('react');

const Tag = require('../tag');

export default class BoldTag extends Tag {
  toHtml() {
    return <hr />;
  }

  toReact() {
    return <hr />;
  }
}
