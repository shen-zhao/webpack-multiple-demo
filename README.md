# webpack-multiple

webpack打包多页面应用

# 安装


**安装依赖**

```npm install```

**开发(配合[velocity](https://github.com/holyzfy/velocityServer)服务)**

```npm run dev```

**生产**

```npm run build locahost:8080 //(静态资源地址, 默认为/)```



# 项目结构

```markdown
Projet
├──build  webpack配置 
├──config  资源配置
├──dist  生产产物, 用于代码调试
├──dev  开发产物, 用于生产发布
├──src
   ├─ assets  资源
   │    ├─ images  图片资源
   │    ├─ video  视频资源
   │    ├─ font  字体
   │    └─ audio  音频资源
   │
   │
   ├─ inc  html碎片, 页面入口可以引用
   │
   │
   ├─ js  脚本
   │   ├─ lib  插件或插件封装
   │   ├─ common.js  公共js
   │   ├─ stylesheet.js  公共style入口
   │   ├─ urlmap.js  接口map
   │   └─ */*.js 页面js
   │ 
   │ 
   ├─ mock  假数据
   │    ├─ js  velocity假数据
   │    └─ json  ajax假数据
   │  
   │
   ├─ pages 所有页面入口
   │  
   │
   ├─ styles 样式 
   │    │   
   │    ├─ helpers 
   │    │    ├─ helpers.scss
   │    │    ├─ mixin.scss
   │    │    └─ function.scss
   │    ├─ common.scss
   │    ├─ form.scss    
   │    ├─ table.scss  
   │    ├─ dialog.scss    
   │    └─ index.scss··· 各页面css
   │    
   │
   │
   └- templates  html模板(供art-template使用)
├──build.js  页面打包配置
```

# 打包规则

## pages

- 页面入口打包到vm目录中

## js

- 每个页面只有一个js入口, 存放在js目录中
- node_modules依赖除去比较大的插件(echarts等), 全部打入vendors.js中
- 本地依赖复合分离标准的全部打入commons.js中
- stylesheet.js单独打包, 无需手动调用, 自动注入到每个页面中

## css/scss

- 页面独立的css/scss由相应的js中`import`注入
- 公共的css/scss由stylesheet.js

## html

inc(html碎片)

- 在入口页面用`${require(<path>)}`语法使用`(代替#parse())`, path为入口页面的相对地址

template(html模板)

- 在js中`import`引入, 供字符串模板使用

## img、vedio、audio等静态资源

- 可直接在html碎片、html模板以及style中根据相对路径引用

## mock

- 开发环境可以正常使用两种mock
- 生产环境删除mock


# 约定规则

## build.js
项目根目录创建`build.js`, 用来指定打包页面入口, 开发某个页面之前必须首先配置页面信息, 示例: 

```js
/* 
    * template: 页面入口名称, 位置src/pages,
    * main: js入口文件路径, 🌰 src/js/ + js名称, 支持子文件夹例如index/index.js会自动生成index目录,
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
        commons: true,
        echarts: true
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
        commons: true,
        echarts: true
    },
    {
        template: '404',
        main: '404/404.js'
    }
];
```

## 资源路径

1.页面入口引入html碎片制定语法: `${require(<path>)}`, 另外, 模板中还可以引入其他模板, 示例: 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>$!title</title>
    <!-- 引入inc/head.html -->
    ${ require('../inc/head.html') }
</head>
<body>
<!-- 引入inc/index.html -->
${ require('../inc/index.html') }
</body>
</html>
```

2.img、vedio、audio等标签引入资源可以直接`src='相对路径'`, 也可以用`src='${ require(<!path>) }'`方式, 示例: 

```html
<div>
    <div>
        <h1>dfsgsdfg</h1>
        <img src="${require('../assets/images/logo.png')}" alt="">
    </div>
    <img src="../assets/images/logo.png" alt="">
</div>
```

## 语法

1.支持`ES2015`、`ES2016`和`ES2017`, 以及`stage-2`阶段的语法, 最后统一编译成浏览器兼容语法

2.模块引入

js文件
- 使用`import`语法, 建议`node_modules`依赖前置, 本地依赖次之
- 扩展名`js`、`json`可省略
- @代表/src, 例如引入index.js, `import index from '@/js/index'`

html文件
- 使用`${require(<!path>)}`

3.建议js格式见`src/js/_suggest.js`(大家提出合理改进意见)


# 改进

大家提出改进意见

# 参考资料

- [wepback](https://www.webpackjs.com/concepts/)
- [babel](http://babeljs.io/docs/en)
- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- [使用 webpack3 配置多页应用（一）](https://www.jianshu.com/p/2cc4a1078953)




