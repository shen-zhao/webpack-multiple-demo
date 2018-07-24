import $ from 'jquery';
import '../styles/index.scss';
import html from '../templates/template.html';
import template from './lib/template';
import tmpl from '../templates/t.html';
import echarts from './lib/echarts';
import './common';

const h1 = document.createElement('h1');

const h2 = document.createElement('h2');

const box = document.createElement('div');

h1.innerHTML = '我又变回去了';

document.body.appendChild(h1);

h2.innerHTML = html;

document.body.appendChild(h2);
console.log(html);

box.innerHTML = template.render(tmpl, {title: 'template测试'});

document.body.appendChild(box);

$.getJSON('../mock/json/test.json', {id: 1}, function(res) {
    if(res.status == 0) {
        // alert(res.message);
    }
});

