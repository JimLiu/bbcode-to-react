import Parser from './parser';
import Tag from './tag';

// export default new Parser();

// export {
//   Parser,
//   Tag
// };

module.exports = new Parser();
module.exports.Parser = Parser;
module.exports.Tag = Tag;
