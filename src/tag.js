const React = require('react');

const URL_RE = /\b((?:([\w-]+):(\/{1,3})|www[.])(?:(?:(?:[^\s&()]|&amp;|&quot;)*(?:[^!"#$%&'()*+,.:;<=>?@\[\]^`{|}~\s]))|(?:\((?:[^\s&()]|&amp;|&quot;)*\)))+)/g;

class Tag {
  constructor(name) {
    this.tags = [];
    this.name = name.toLowerCase();
    this.attributes = {};
    this.attribute = null;
    this.selfClose = false;
    this.isClosed = false;
    this.parent = null;
    this.outerText = '';
  }

  toReact() {
    return null;
  }

  toHtml() {
    return '';
  }

  getInnerHtml() {
    return this.tags.map(tag => tag.toHtml()).join('');
  }

  getReactChildren() {
    const components = this.tags.map(tag => tag.toReact());
    return React.Children.toArray(components);
  }


  linkify(value) {
    return value.replace(URL_RE, (...match) => {
      const url = match[1];
      const proto = match[2];

      if (proto && ['http', 'https'].indexOf(proto) === -1) {
        return null; // bad protocol, no linkify
      }

      const href = proto ? url : `//${url}`;

      return href;
    });
  }

  escape(s) {
    return s
      .replace(/\\/g, '\\\\') /* This MUST be the 1st replacement. */
      .replace(/\t/g, '\\t') /* These 2 replacements protect whitespaces. */
      .replace(/\n/g, '\\n')
      .replace(/\u00A0/g, '\\u00A0') /* Useful but not absolutely necessary. */
      .replace(/&/g, '\\x26') /* These 5 replacements protect from HTML/XML. */
      .replace(/'/g, '\\x27')
      .replace(/"/g, '\\x22')
      .replace(/</g, '\\x3C')
      .replace(/>/g, '\\x3E');
  }

  renderAttributes() {
    return Object.reduce((acc, attName) => {
      acc.push(`${attName}=${this.escape(this.attributes[attName])}`);
      return acc;
    }, []).join(' ');
  }
}

module.exports = Tag;
