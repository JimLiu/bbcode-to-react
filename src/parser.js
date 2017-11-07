// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/parser.coffee
import React from 'react';
import { SPACE_RE, TOKEN_RE, START_NEWLINE_RE } from './constants';
import defaultTags from './tags';
import Tag from './tag';
import Renderer from './renderer';

export default class Parser {
  constructor(allowedTags = null) {
    this.tags = {};

    if (!allowedTags) {
      this.tags = defaultTags;
    } else {
      allowedTags.forEach(name => {
        if (defaultTags[name]) {
          this.tags[name] = defaultTags[name];
        }
      });
    }

    this.renderer = new Renderer();
  }

  registerTag(name, tag) {
    this.tags[name] = tag;
  }

  parseParams(token) {
    const params = [];

    function addParam(name, value) {
      if (name) {
        const n = name.trim();
        // ignore on* events attribute
        if (n.length && n.toLowerCase().indexOf('on') !== 0) {
          params.push([n, value]);
        }
      }
    }

    if (token) {
      let key = [];
      let target = key;
      let value = [];
      let terminate = ' ';
      let skipNext = false;

      Array.from(token).forEach(c => {
        if (skipNext) {
          skipNext = false;
        } else if (target === key && c === '=') {
          target = value;
        } else if (target === key && c === ':') {
          target = value;
        } else if (!value.length && c === '"') {
          terminate = c;
        } else if (c !== terminate) {
          target.push(c);
        } else {
          addParam(key.join(''), value.join(''));

          if (!SPACE_RE.test(terminate)) {
            skipNext = true;
          }

          target = key = [];
          value = [];
          terminate = ' ';
        }
      });

      addParam(key.join(''), value.join(''));
    }

    return params;
  }

  createTextNode(parent, text) {
    const ref = parent.children.slice(-1)[0];
    //console.log('ref', ref, text)
    if (ref != null && ref.STRIP_OUTER) {
      text = text.replace(START_NEWLINE_RE, '');
    }

    return new Tag(this.renderer, { text, parent });
  }

  parse(input) {
    const root = new Tag(this.renderer);
    const tokens = input.split(TOKEN_RE);
    let current = root;
    let token = null;
    while (tokens.length) {
      token = tokens.shift();
      if (!token.length) {
        continue;
      }

      if (token.match(TOKEN_RE)) {
        let params = this.parseParams(token.slice(1, -1));
        let tagName = params[0][0].toLowerCase();

        if (current.CLOSED_BY.indexOf(tagName) > -1) {
          tokens.unshift(token);
          tagName = `/${current.name}`;
          params = [];
        }

        if (tagName[0] === '/') {
          tagName = tagName.slice(1);
          if (!this.tags[tagName]) {
            this.createTextNode(current, token);
            continue;
          }

          if (current.name === tagName) {
            current = current.parent;
          }
        } else {
          const cls = this.tags[tagName];
          if (!cls) {
            this.createTextNode(current, token);
            continue;
          }

          const tag = new cls(this.renderer, {
            name: tagName,
            parent: current,
            params,
          });

          if (!tag.SELF_CLOSE && (tag.CLOSED_BY.indexOf(tagName) < 0 || current.name !== tagName)) {
            current = tag;
          }
        }
      } else {
        this.createTextNode(current, token);
      }
    }

    return root;
  }

  toHTML(input) {
    return this.parse(input).toHTML();
  }

  toReact(input) {
    return this.parse(input).toReact();
  }
}

