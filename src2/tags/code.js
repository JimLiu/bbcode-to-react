// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
import React from 'react';
import Tag from '../tag';

export default class CodeTag extends Tag {
  constructor(renderer, settings = {}) {
    super(renderer, settings);

    this.STRIP_INNER = true;
    this.inline = this.params.code === 'inline';

    if (!this.inline) {
      this.STRIP_OUTER = true;
    }
  }

  toHTML() {
    if (this.inline) {
      return ['<code>', this.getContent(true), '</code>'];
    }
    const lang = this.params.lang || this.params[this.name];
    if (lang) {
      return [`<pre class=\"prettyprint lang-${lang}\">`, this.getContent(true), '</pre>'];
    }
    return ['<pre>', this.getContent(true), '</pre>'];
  }

  toReact() {
    if (this.inline) {
      return (
        <code>{this.getContent(true)}</code>
      );
    }
    const lang = this.params.lang || this.params[this.name];

    let className = 'prettyprint';
    if (lang) {
      className += ` lang-${lang}`;
    }
    return (
      <pre className={className}>
        {this.getContent(true)}
      </pre>
    );
  }
}

