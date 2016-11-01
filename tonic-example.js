var React = require('react');
var ReactDOMServer = require('react-dom/server');
var bbcode = require('bbcode-to-react');

class MyComponent extends React.Component {
  render() {
    console.log(bbcode.default);
    return <p>{bbcode.default.toReact('[b]strong[/b]')}</p>;
  }
}

// render: <p><strong>strong</strong></p>
ReactDOMServer.renderToString(<MyComponent />);
