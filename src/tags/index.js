import Tag from '../tag';
import CodeTag from './code';
import ImageTag from './image';
import HorizontalRuleTag from './hr';
import SizeTag from './size';
import CenterTag from './center';
import RightTag from './right';
import ColorTag from './color';
import ListTag from './list';
import ListItemTag from './item';
import QuoteTag from './quote';
import LinkTag from './link';
import createSimpleTag from './simple';

export default {
  b: createSimpleTag('strong'),
  i: createSimpleTag('em'),
  u: createSimpleTag('u'),
  s: createSimpleTag('strike'),
  h1: createSimpleTag('h1', { STRIP_OUTER: true }),
  h2: createSimpleTag('h2', { STRIP_OUTER: true }),
  h3: createSimpleTag('h3', { STRIP_OUTER: true }),
  h4: createSimpleTag('h4', { STRIP_OUTER: true }),
  h5: createSimpleTag('h5', { STRIP_OUTER: true }),
  h6: createSimpleTag('h6', { STRIP_OUTER: true }),
  pre: createSimpleTag('pre'),
  table: createSimpleTag('table', { DISCARD_TEXT: true }),
  thead: createSimpleTag('thead', { DISCARD_TEXT: true }),
  tbody: createSimpleTag('tbody', { DISCARD_TEXT: true }),
  tr: createSimpleTag('tr', { DISCARD_TEXT: true }),
  th: createSimpleTag('th'),
  td: createSimpleTag('td'),
  code: CodeTag,
  img: ImageTag,
  hr: HorizontalRuleTag,
  size: SizeTag,
  center: CenterTag,
  right: RightTag,
  color: ColorTag,
  list: ListTag,
  '*': ListItemTag,
  quote: QuoteTag,
  url: LinkTag,
  link: LinkTag,
  email: LinkTag,
};
