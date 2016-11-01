import React from 'react';
import parser from 'bbcode-to-react';
import { renderToString } from 'react-dom/server';

const Example = (props) => {
  return (
    <p>{parser.toReact('[b]strong[/b]')}</p>
  );
}

// render: <p><strong>strong</strong></p>
console.log(renderToString(<Example />));
