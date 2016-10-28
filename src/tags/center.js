// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
import React from 'react';
import Tag from '../tag';

export default class CenterTag extends Tag {

  toHTML() {
    return ['<div style="text-align:center;">', this.getContent(), '</div>'];
  }

  toReact() {
    return (
      <div style={{ textAlign: 'center' }}>
        {this.getComponents()}
      </div>
    );
  }

}

