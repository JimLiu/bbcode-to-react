// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
import React from 'react';
import Tag from '../tag';

export default class RightTag extends Tag {

  toHTML() {
    return ['<div style="text-align:right;">', this.getContent(), '</div>'];
  }

  toReact() {
    return (
      <div style={{ textAlign: 'right' }}>
        {this.getComponents()}
      </div>
    );
  }
}

