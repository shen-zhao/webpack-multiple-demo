import $ from 'jquery';
import '../styles/list.scss';
import urlmap from './urlmap';
import template from './lib/template';
import { pagination } from './common';
import listTmpl from '../templates/list.html';

const _METHODS = {
    getListData(params) {
        return new Promise(function(resolve, reject) {
            $.getJSON(urlmap['list'], params, res => {
                if(res.status !== 0) {
                    reject(res.message);
                }
                resolve(res.data);
            })
            .fail(err => {
                reject(err);
            });
        });
    },
    tableRender(params) {
        params = params || {};
        this.getListData(params)
            .then(data => {
                let _html = template.compile(listTmpl)(data);
                $('#content').html(_html);
                let options = {
                    current : data.current,
                    limit : data.limit,
                    count : data.count,
                    callback : (index, limit) => {
                        params.current = index;
                        params.limit = limit;
                        this.tableRender(params);
                        return false;
                    }
                };
                pagination('#pagination', options);
            })
            .catch(err => {
                if(err instanceof Error) throw err;
                console.dir(err);
            });
    }
};

function bindEvent() {

}

function init() {
    //渲染列表
    _METHODS.tableRender();
}

function start() {
    bindEvent();
    init();
}

start();

