const React = require('react');

const Tag = require('../tag');

export default class QuoteTag extends Tag {

  toHtml() {
    if (!this.selfClose && !this.isClosed) {
      return this.outerText;
    }

    const { index, user } = this.attributes;

    if (index && user) {
      return `
        <div class="quote">
          <div class="title">
            <strong>${user}:</strong>
            <span class="quoteIndex">#${index}</span>
          </div>
          <blockquote>
            ${this.getInnerHtml()}
          </blockquote>
        </div>
      `;
    }

    return `
      <div class="quote">
        <blockquote>${this.getInnerHtml()}</blockquote>
      </div>
    `;
  }

  toReact() {
    if (!this.selfClose && !this.isClosed) {
      return this.outerText;
    }

    const { index, user } = this.attributes;

    if (index && user) {
      return (
        <div className="quote">
          <div className="title">
            <strong>{user}:</strong>
            <span className="quoteIndex">#{index}</span>
          </div>
          <blockquote>
            {this.getReactChildren()}
          </blockquote>
        </div>
      );
    }
    return <blockquote className="quote">{this.getReactChildren()}</blockquote>;
  }
}
