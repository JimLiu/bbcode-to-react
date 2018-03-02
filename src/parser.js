const WHITESPACE_CHARS = [' ', '\r', '\n', '\t'];
// for ReadStartTag and ReadAttributeName
const SPECIAL_CHARS1 = [' ', '\r', '\n', '\t', '/', ']', '='];
// for ReadEndTag and ReadAttributeValue
const SPECIAL_CHARS2 = [' ', '\r', '\n', '\t', ']'];

// \r\n\t/]=

const ParseStatus = {
  ReadText: 0,
  ReadEndTag: 1,
  ReadStartTag: 2,
  ReadAttributeName: 3,
  ReadAttributeValue: 4
};


function getTokens(input) {
  const tokens = [];
  let i = 0;
  let status = ParseStatus.ReadText;

  // skip white spaces
  const skipWhiteSpaces = () => {
    while (i < input.length
      && WHITESPACE_CHARS.includes(input[i])) {
      i++;
    }
  };

  // add tag name or attribute name or attribute value
  const addNameOrValue = (specialChars) => {
    const start = i;
    while (i < input.length
      && !specialChars.includes(input[i])) {
      i++;
    }
    tokens.push(input.substr(start, i - start));
  };


  while (i < input.length) {
    if (status === ParseStatus.ReadText) {
      // find next '['
      let nextIndex = input.indexOf('[', i);
      // not found
      if (nextIndex === -1) {
        tokens.push(input.substr(i));
        break;
      }

      // if found a '[', then try to find it's ']'
      const nextNextEndtagIndex = input.indexOf(']', nextIndex);
      // not found the endtag ']'
      if (nextNextEndtagIndex === -1) {
        tokens.push(input.substr(i));
        break;
      }

      // find next begin tag '['
      let nextNextBegintagIndex = input.indexOf('[', nextIndex + 1);

      // if the next begin tag is before the next end tag
      // e.g. '[tab [ [tag ]'
      if (nextNextBegintagIndex !== -1 &&
        nextNextBegintagIndex < nextNextEndtagIndex) {
        // find the last one
        while (nextNextBegintagIndex !== -1 &&
          nextNextBegintagIndex < nextNextEndtagIndex) {
          nextIndex = nextNextBegintagIndex;
          nextNextBegintagIndex = input.indexOf('[', nextIndex + 1);
        }

        tokens.push(input.substr(i, nextIndex - i));
        i = nextIndex;
      } else if (i < input.length - 2 // it's '[/'
          && input[i] === '[' && input[i + 1] === '/'
      ) {
        i += 2;
        tokens.push('[/');
        status = ParseStatus.ReadEndTag;
      } else if (input[i] === '[') { // it's '['
        i++;
        tokens.push('[');
        status = ParseStatus.ReadStartTag;
      } else {
        tokens.push(input.substr(i, nextIndex - i));
        i = nextIndex;
      }
    } else if (status === ParseStatus.ReadStartTag) {
      // skip white spaces
      skipWhiteSpaces();

      // add tagname
      addNameOrValue(SPECIAL_CHARS1);

      // skip white spaces
      skipWhiteSpaces();

      if (i < input.length - 1
        && input[i] === '/' && input[i + 1] === ']') {
        tokens.push('/]');
        status = ParseStatus.ReadText;
        i += 2;
      } else if (i < input.length && input[i] === ']') {
        tokens.push(']');
        status = ParseStatus.ReadText;
        i++;
      } else {
        status = ParseStatus.ReadAttributeName;
      }
    } else if (status === ParseStatus.ReadEndTag) {
      // skip white spaces
      skipWhiteSpaces();

      // add tagname
      addNameOrValue(SPECIAL_CHARS2);

      // skip white spaces
      skipWhiteSpaces();

      if (i < input.length && input[i] === ']') {
        tokens.push(']');
        status = ParseStatus.ReadText;
        i++;
      }
    } else if (status === ParseStatus.ReadAttributeName) {
      // skip white spaces
      skipWhiteSpaces();

      // add attribute name
      addNameOrValue(SPECIAL_CHARS1);

      // skip white spaces
      skipWhiteSpaces();

      if (i < input.length - 1
        && input[i] === '/' && input[i + 1] === ']') {
        tokens.push('/]');
        status = ParseStatus.ReadText;
        i += 2;
      } else if (i < input.length && input[i] === ']') {
        tokens.push(']');
        status = ParseStatus.ReadText;
        i++;
      } else if (i < input.length && input[i] === '=') {
        tokens.push('=');
        i++;
        status = ParseStatus.ReadAttributeValue;
      } else if (i < input.length && input[i] === '/') {
        i++;
      }
    } else if (status === ParseStatus.ReadAttributeValue) {
      // skip white spaces
      skipWhiteSpaces();

      if (i < input.length && (input[i] === '\'' || input[i] === '"')) {
        const valueStart = i;
        const quotation = input[i];
        i++;
        while (i < input.length && input[i] !== quotation) {
          i++;
        }
        if (i < input.length && input[i] === quotation) {
          i++;
        }
        tokens.push(input.substr(valueStart + 1, i - valueStart - 2));
        status = ParseStatus.ReadAttributeName;
      } else {
        addNameOrValue(SPECIAL_CHARS2);
        // skip white spaces
        skipWhiteSpaces();

        status = ParseStatus.ReadAttributeName;
      }

      if (i < input.length - 1
        && input[i] === '/' && input[i + 1] === ']') {
        tokens.push('/]');
        status = ParseStatus.ReadText;
        i += 2;
      } else if (i < input.length && input[i] === ']') {
        tokens.push(']');
        i++;
        status = ParseStatus.ReadText;
      }
    }
  }
  return tokens;
}


module.exports = {
  getTokens,
};
