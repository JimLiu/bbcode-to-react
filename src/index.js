const React = require('react');

const { getTokens } = require('./parser');
const { TextTag, defaultTags } = require('./tags');

class BBCode {
  constructor(Tags = defaultTags) {
    this.Tags = Tags;
  }

  toHtml(text) {
    const tags = this.parse(text);
    return tags.map(tag => tag.toHtml()).join('');
  }

  toReact(text) {
    const tags = this.parse(text);
    const components = tags.map(tag => tag.toReact());
    return React.Children.toArray(components);
  }

  parse(text) {
    const tags = [];
    const tokens = getTokens(text);

    let index = 0;

    function moveTagsDown(nodeIndex, parent) {
      for (let i = nodeIndex; i < tags.length; i++) {
        parent.tags.push(tags[i]);
        tags[i].parent = parent;
      }

      const c = tags.length;
      for (let i = nodeIndex; i < c; i++) {
        tags.splice(nodeIndex, 1);
      }
      parent.isClosed = true;
    }

    function findOpenTagIndex(name) {
      const lowercaseName = name.toLowerCase();
      for (let i = tags.length - 1; i >= 0; i--) {
        const t = tags[i];
        if (!t.isText && t.name === lowercaseName
          && !t.tags.length && !t.selfClose) {
          return i;
        }
      }
      return -1;
    }

    function addText(arg) {
      const value = Array.isArray(arg) ? arg.join('') : arg;
      if (value) {
        if (tags.length && tags[tags.length - 1].isText) {
          tags[tags.length - 1].text += value;
        } else {
          tags.push(new TextTag(value));
        }
      }
    }

    while (index < tokens.length) {
      if (tokens[index] === '[') {
        index++;

        const preTagTokens = [];
        while (index === tokens.length
          || (index < tokens.length && tokens[index] === '[')) {
          preTagTokens.push('[');
          index++;
        }

        if (preTagTokens.length > 0) {
          addText(preTagTokens);
        }

        if (index >= tokens.length) {
          break;
        }

        const tagName = tokens[index];
        const Tag = this.Tags[tagName.toLowerCase()];
        const tagText = ['[', tagName];

        let tag = null;
        if (Tag) {
          tag = new Tag(tagName);
        }

        index++;

        // find all attributes
        while (index < tokens.length && tokens[index] !== ']'
          && tokens[index] !== '/]') {
          const attributeName = tokens[index];
          if (attributeName) {
            tagText.push(' ', attributeName);
          }
          index++;
          if (index < tokens.length && tokens[index] === '=') {
            tagText.push('=');
            index++;
            const attributeValue = tokens[index];
            tagText.push(attributeValue);
            index++;
            if (attributeValue) {
              if (tag) {
                if (attributeName) {
                  tag.attributes[attributeName] = attributeValue;
                } else {
                  tag.attribute = attributeValue;
                }
              }
            }
          } else if (index < tokens.length && attributeName) {
            if (tag) {
              tag.attributes[attributeName] = true;
            }
          }
        }
        if (index < tokens.length && tokens[index] === '/]') {
          if (tag) {
            tag.selfClose = true;
          }
          tagText.push('/]');
          index++;
        } else if (index < tokens.length && tokens[index] === ']') {
          tagText.push(']');
          index++;
        }

        if (tag) {
          tags.push(tag);
          tag.outerText = tagText.join('');
        } else {
          addText(tagText);
        }
      } else if (tokens[index] === ']') {
        addText(']');
        index++;
      } else if (tokens[index] === '[/') {
        const tagText = ['[/'];
        index++;
        if (index >= tokens.length) {
          addText(tagText);
          break;
        }

        const tagName = tokens[index];
        tagText.push(tagName);
        index++;

        const openIndex = findOpenTagIndex(tagName);

        if (openIndex !== -1) {
          moveTagsDown(openIndex + 1, tags[openIndex]);
        }

        while (index < tokens.length && tokens[index] !== ']') {
          tagText.push(tokens[index]);
          index++;
        }

        if (index < tokens.length && tokens[index] === ']') {
          tagText.push(tokens[index]);
          index++;
        }

        // coundn't find it's open tag
        if (openIndex === -1) {
          // add as a text tag
          addText(tagText);
        }
      } else {
        const value = tokens[index];
        if (value) {
          addText(value);
        }
        index++;
      }
    }

    return tags;
  }
}

module.exports = BBCode;
