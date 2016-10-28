
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

const Example = (props) => {
  return (
    <p>{parser.toReact('[b]strong[/b]')}</p>
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
