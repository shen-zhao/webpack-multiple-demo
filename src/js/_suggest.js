import $ from 'jquery';
import urlmap from './urlmap';

//尽量习惯方法抽离, 以依赖形式引入, 不可复用的方法可以直接写在_METHODS中, 全局变量放入_VARS中, 不同代码逻辑必须备注功能

//变量
const _VARS = {
    id: 1
};

//方法
const _METHODS = {
    getData(res) {
        return res;
    }
};

//事件处理
function bindEvent() {

}

//页面初始化
function init() {

}

//开始
function start() {
    bindEvent();
    init();
}

start();