# webpack-multiple

webpack打包多页面应用

# 安装

// 安装依赖

`npm install`

// 开发(结合[velocity](https://github.com/holyzfy/velocityServer)服务)

`npm run dev`

// 生产

`npm run build locahost:8080`(静态资源地址, 默认为/)

# 项目结构

Projet
├──build  webpack配置 
├──config  资源配置
├──dist  生产产物(gitignore))
├──dev  开发产物(gitignore)
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
   ├─ templates  html模板(供art-template使用)
   │    
   │
   └- store  状态树(组件传参, 状态维护)