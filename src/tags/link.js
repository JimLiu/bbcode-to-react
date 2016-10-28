// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
import React from 'react';
import Tag from '../tag';

export default class LinkTag extends Tag {

  toHTML() {
    let url = this.renderer.strip(this.params[this.name] || this.getContent(true));
    if (/javascript:/i.test(url)) {
      url = '';
    }

    if (!url || !url.length) {
      return this.getContent();
    }

    return this.renderer.context(
      { linkify: false },
      () => [`<a href="${url}" target="_blank">`, this.getContent(), '</a>']
    );
  }

  toReact() {
    let url = this.renderer.strip(this.params[this.name] || this.getContent(true));
    if (/javascript:/i.test(url)) {
      url = '';
    }

    if (!url || !url.length) {
      return this.getComponents();
    }

    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {this.getComponents()}
      </a>
    );
  }
}

