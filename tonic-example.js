var React = require('react');
var ReactDOMServer = require('react-dom/server');
var bbcode = require('bbcode-to-react');

/* Code for customize tag
class YoutubeTag extends bbcode.Tag {
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

class BoldTag extends bbcode.Tag {
  toReact() {
    // using this.getComponents() to get children components.
    return (
      <b>{this.getComponents()}</b>
    );
  }
}

// [youtube width="400"]https://www.youtube.com/watch?v=AB6RjNeDII0[/youtube]
bbcode.registerTag('youtube', YoutubeTag); // add new tag
bbcode.registerTag('b', BoldTag); // replace exists tag
*/

class MyComponent extends React.Component {
  render() {
    return <p>{bbcode.toReact('[b]My Video: [/b][youtube width="400"]https://www.youtube.com/watch?v=AB6RjNeDII0[/youtube]')}</p>;
  }
}

ReactDOMServer.renderToString(<MyComponent />);
