import TextTag from './text';
import UrlTag from './url';
import CodeTag from './code';
import ImgTag from './img';
import HRTag from './hr';
import QuoteTag from './quote';
import ColorTag from './color';
import SizeTag from './size';
import alignTag from './align';
import createSimpleTag from './simple';

const CenterTag = alignTag('center');
const LeftTag = alignTag('left');
const RightTag = alignTag('right');

const defaultTags = {
  b: createSimpleTag('strong'),
  strong: createSimpleTag('strong'),
  i: createSimpleTag('em'),
  u: createSimpleTag('u'),
  s: createSimpleTag('strike'),
  h1: createSimpleTag('h1'),
  h2: createSimpleTag('h2'),
  h3: createSimpleTag('h3'),
  h4: createSimpleTag('h4'),
  h5: createSimpleTag('h5'),
  h6: createSimpleTag('h6'),
  pre: createSimpleTag('pre'),
  table: createSimpleTag('table'),
  thead: createSimpleTag('thead'),
  tbody: createSimpleTag('tbody'),
  tr: createSimpleTag('tr'),
  th: createSimpleTag('th'),
  td: createSimpleTag('td'),
  code: CodeTag,
  img: ImgTag,
  hr: HRTag,
  size: SizeTag,
  center: CenterTag,
  left: LeftTag,
  right: RightTag,
  color: ColorTag,
  quote: QuoteTag,
  url: UrlTag,
  link: UrlTag,
  email: UrlTag,
};


module.exports = {
  TextTag,
  LeftTag,
  CenterTag,
  RightTag,
  UrlTag,

  createSimpleTag,

  defaultTags,
};
