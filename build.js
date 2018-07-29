/* 
    template: 页面入口名称, 位置src/pages,
    main: js入口文件路径, 🌰 src/js/ + js名称, 支持子文件夹例如index/index.js会自动生成index目录,
    vendors: 插件来源为node_modules, 包括jQuery, art-template等,
    commons: 入口脚本的本地依赖文件,
    echarts: echarts库, 注: echarts库比较大, 没有打入vendors, 后续如有大型插件需要单独引用的需修改配置,
    stylesheet: 所有公共样式，如common.scss/form.scss/table.scss/reset.scss等, 为false时不引入
 */
module.exports = [
    {
        template: 'index',
        main: 'index.js',
        vendors: true,
        commons: true
    },
    {
        template: 'detail',
        main: 'detail.js',
        vendors: true,
        commons: true,
        echarts: true
    },
    {
        template: 'list',
        main: 'list.js',
        vendors: true,
        commons: true
    },
    {
        template: '404',
        main: '404.js',
        stylesheet: false
    }
];