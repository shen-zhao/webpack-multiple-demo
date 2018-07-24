import $ from 'jquery';
import template from './lib/template';
import echarts from './lib/echarts';
import './common';

const h1 = document.createElement('h1');

h1.innerHTML = '详情页';

document.body.appendChild(h1);

console.log($('body'));

console.log(template);