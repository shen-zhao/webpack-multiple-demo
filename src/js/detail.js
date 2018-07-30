import $ from 'jquery';
import echarts from './lib/echarts';
import urlmap from './urlmap';
import '../styles/detail.scss';

//方法
const _METHODS = {
    getChartData() {
        return new Promise(function(resolve, reject) {
            $.getJSON(urlmap['detail'], res => {
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
    initChart(data) {
        const series = [];
        for(let name in data) {
            series.push({
                name: name,
                type: 'bar',
                barGap: 0,
                data: data[name]
            });
        }
        const option = {
            color: ['#003366', '#006699', '#4cabce', '#e5323e'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['Forest', 'Steppe', 'Desert', 'Wetland']
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: ['2012', '2013', '2014', '2015', '2016']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                ...series
            ]
        };
        let myChart = echarts.init(document.querySelector('#echart_container'));
        myChart.setOption(option);
    }
};

function init() {
    _METHODS.getChartData()
        .then(data => {
            _METHODS.initChart(data);
        })
        .catch(err => {
            if (err instanceof Error) throw err;
            console.log(err || '系统异常');
        });
}

function start() {
    init();
}

start();

