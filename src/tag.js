// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
import React from 'react';
import { NEWLINE_RE, LINE_BREAK } from './constants';

export default class Tag {

  constructor(renderer, settings = {}) {
    this.renderer = renderer;
    this.CLOSED_BY = [];
    this.SELF_CLOSE = false;
    this.STRIP_INNER = false;
    this.STRIP_OUTER = false;
    this.DISCARD_TEXT = false;

    this.name = settings.name || null;
    this.parent = settings.parent || null;
    this.text = settings.text || '';
    this.params = {};
    this.children = [];

    if (this.parent) {
      this.parent.children.push(this);
    }

    settings.params = settings.params || [];

    settings.params.forEach(item => {
      if (item.length > 1 && item[1]) {
        this.params[item[0]] = item[1];
      }
    });
  }

  getComponents() {
    const components = [];
    if (this.text && this.text.length) {
      // todo linkify and emotion
      components.push(this.text);
    }

    this.children.forEach(child => {
      if (!(this.DISCARD_TEXT && child.name === null)) {
        const childComponents = child.toReact();
        components.push(childComponents);
      }
    });

    return React.Children.toArray(components);
  }

  getContent(raw = false) {
    const pieces = [];
    let text;
    let content;

    if (this.text && this.text.length) {
      text = this.renderer.escape(this.text);

      if (!raw) {
        if (this.renderer.options.linkify) {
          text = this.renderer.linkify(text);
        }
        text = this.renderer.cosmeticReplace(text.replace(NEWLINE_RE, LINE_BREAK));
      }

      pieces.push(text);
    }

    this.children.forEach(child => {
      if (raw) {
        pieces.push(child.toText());
      } else {
        if (!(this.DISCARD_TEXT && child.name === null)) {
          const childPieces = child.toHTML();
          if (typeof childPieces === 'string') {
            pieces.push(childPieces);
          } else {
            pieces.push(...childPieces);
          }
        }
      }
    });

    content = pieces.join('');

    if (!raw && this.STRIP_INNER) {
      content = this.renderer.strip(content);

      while (content.slice(0, LINE_BREAK.length) === LINE_BREAK) {
        content = content.slice(LINE_BREAK.length);
      }
      while (content.slice(-LINE_BREAK.length) === LINE_BREAK) {
        content = content.slice(0, -LINE_BREAK.length);
      }
      content = this.renderer.strip(content);
    }
    return content;
  }

  toText(contentAsHTML = false) {
    const pieces = [];

    if (this.name !== null) {
      if (this.params.length) {
        const params = Object.keys(this.params).map(k => `${k}=${this.params[k]}`).join(' ');

        if (this.params[this.name]) {
          pieces.push(`[${params}]`);
        } else {
          pieces.push(`[${this.name} ${params}]`);
        }
      } else {
        pieces.push(`[${this.name}]`);
      }
    }

    pieces.push(this.getContent(!contentAsHTML));

    if (this.name !== null && this.CLOSED_BY.indexOf(this.name) === -1) {
      pieces.push(`[/${this.name}]`);
    }

    return pieces.join('');
  }

  toHTML() {
    const pieces = this.toText(true);

    return (typeof pieces === 'string') ? pieces : pieces.join('');
  }

  toReact() {
    return React.Children.toArray(this.getComponents());
  }

}
