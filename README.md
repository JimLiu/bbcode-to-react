
# bbcode-to-react

A utility for turning raw BBCode into React elements.

## Installation

Install `bbcode-to-react` and __peer dependencies__ via NPM

```sh
npm install --save bbcode-to-react react
```

Import `bbcode-to-react`, example:

```js
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


```

## Add new tag example

```js
import React from 'react';
import parser, { Tag } from 'bbcode-to-react';

class YoutubeTag extends Tag {
  toReact() {
    // using this.getContent(true) to get it's inner raw text.
    const attributes = {
      src: this.getContent(true),
      width: this.params.width || 420,
      height: this.params.height || 315,
    };
    return (
      <iframe
        {...attributes}
        frameBorder="0"
        allowFullScreen
      />
    );
  }
}

class BoldTag extends Tag {
  toReact() {
    // using this.getComponents() to get children components.
    return (
      <b>{this.getComponents()}</b>
    );
  }
}

parser.registerTag('youtube', YoutubeTag); // add new tag
parser.registerTag('b', BoldTag); // replace exists tag

const Example = (props) => {
  return (
    <p>{parser.toReact('[youtube width="400"]https://www.youtube.com/embed/AB6RjNeDII0[/youtube]')}</p>
  );
}

```

## Development

Install dependencies:

```sh
npm install
```

Run examples at [http://localhost:8080/](http://localhost:8080/) with webpack dev server:

```sh
npm start
```

Run tests & coverage report:

```sh
npm test
```

Watch tests:

```sh
npm run test-watch
```

# Credits

* **bbcodejs:** `bbcode-to-react` uses the parser from [bbcodejs](https://github.com/vishnevskiy/bbcodejs), so much of the credit is due there.
* **reactstrap:** `bbcode-to-react` uses the webpack config and publish scripts from [reactstrap](https://github.com/reactstrap/reactstrap).



