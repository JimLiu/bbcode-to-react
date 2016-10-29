// http://1nfosec4all.blogspot.com/2012/07/bulletin-board-code-bbcode-xss-exploit.html
import React from 'react';
import { shallow } from 'enzyme';

import parser from '../';

describe('security test', () => {
  it('should not allow [URL] Tag injection', () => {
    const bbcode = '[url]javascript:alert(0)[/url]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('javascript:alert(0)');
    expect(wrapper.type()).toBeUndefined();
  });

  it('should not allow [COLOR] Tag Injection', () => {
    const bbcode = '[color=#ff0000;font-size:100px;]Got You[/color]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('Got You');
    expect(wrapper.prop('style').color).not.toBe('#ff0000;');
    expect(wrapper.prop('style').fontSize).toBeUndefined();
  });

  it('should not allow [COLOR] Tag Injection', () => {
    const bbcode = '[color=#ff0000;You:expression(alert(String.fromCharCode(88,83,83)));]Got You[/color]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.text()).toBe('Got You');
    expect(wrapper.prop('style').color).not.toBe('#ff0000;');
    expect(wrapper.prop('style').color).toBe('#ff0000;You:expression(alert(String.fromCharCode(88,83,83)));');
    expect(wrapper.prop('style').expression).toBeUndefined();
  });

  it('should not allow [FONT] Tag Injection', () => {
    const bbcode = '[font=Impact, Compacta, Chicago, sans-serif;color:red;]Got You[/font]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>);

    expect(wrapper.html()).toBe('<div>[font=Impact, Compacta, Chicago, sans-serif;color:red;]Got You[/font]</div>');
  });

  it('should not allow [FONT] Tag Injection', () => {
    const bbcode = '[font=Impact, Compacta, Chicago, sans-serif;You:expression(alert(String.fromCharCode(88,83,83)));]Got You[/font]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>);

    expect(wrapper.html()).toBe('<div>[font=Impact, Compacta, Chicago, sans-serif;You:expression(alert(String.fromCharCode(88,83,83)));]Got You[/font]</div>');
  });

  it('should not allow [IMG] Tag Injection', () => {
    const bbcode = '[img]NotExist.png" onerror="alert(String.fromCharCode(88,83,83))[/img]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>).children().first();

    expect(wrapper.type()).toBe('img');
    expect(wrapper.prop('onerror')).toBeUndefined();
  });

  it('should not allow [TABLE] Tag Injection', () => {
    const bbcode = '[table cellSpacing="0" cellPadding="0" width="100%"][tbody][tr][td width="*" onmouseover="alert(String.fromCharCode(88,83,83))"]Got You[/td][/tr][/tbody][/table]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>);

    expect(wrapper.find('td').first().prop('width')).toBe('*');
    expect(wrapper.find('td').first().prop('onmouseover')).toBeUndefined();
    expect(wrapper.find('td').first().text()).toBe('Got You');
  });

  it('should not allow Nested Tags Injection', () => {
    const bbcode = '[url]http://www.good.com?[url] onmousemove=javascript:alert(String.fromCharCode(88,83,83));//[/url][/url]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>);

    expect(wrapper.find('a').length).toBe(0);
  });

  it('should not allow Nested Tags Injection', () => {
    const bbcode = '[img]http://foo.com/NotExist.png [img] onerror=javascript:alert(String.fromCharCode(88,83,83)) [/img] [/img]';
    const wrapper = shallow(<div>{parser.toReact(bbcode)}</div>);

    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('img').first().type()).toBe('img');
    expect(wrapper.find('img').first().prop('onerror')).toBeUndefined();
  });
});
