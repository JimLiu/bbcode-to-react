import React from 'react';
import Tag from '../tag';

export default class CodeTag extends Tag {
  toHTML() {
    if (!this.selfClose && !this.isClosed) {
      return this.outerText;
    }

    if (this.attributes.inline) {
      return `<code>${this.getInnerHtml()}</code>`;
    }

    const lang = this.attributes.lang || this.attributes[this.name];
    let className = lang ? `prettyprint lang-${lang}` : 'prettyprint';

    return `<pre class="${className}">${this.getInnerHtml()}</pre>`;
  }

  toReact() {
    if (!this.selfClose && !this.isClosed) {
      return this.outerText;
    }

    if (this.attributes.inline) {
      return (
        <code>{this.getReactChildren()}</code>
      );
    }
    const lang = this.attributes.lang || this.attributes[this.name];

    let className = lang ? `prettyprint lang-${lang}` : 'prettyprint';

    return (
      <pre className={className}>
        {this.getReactChildren()}
      </pre>
    );
  }
}

