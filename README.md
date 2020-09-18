
# 仿抖音视频流

## 说明
- 版本：2.0.1
- 已升级成为uniCloud项目,体验地址：[仿抖音视频流](https://static-1505c3b4-6387-4722-bd09-166a749af2e5.bspapp.com)
- 该模板有授权并贡献给uView UI框架，后续uView大佬会更新

## 使用
- 前端应用框架：uni-app
- 开发工具：HBuilder（必须）
- 1、HBuilder新建uni-app项目（默认模板即可），同时勾选启用uniCloud，再把下载的包导入项目根目录
- 2、在App.vue文件的style添加以下内容
```js
@import './common/uni.css';
```
- 3、记得pages.json路由要新增path ： pages/douyin/index

### 也可以直接下载示例项目zip包，用HBuilder直接打开编译使用（需要在manifest.json的可视化界面获取appid）


## 开发目录
- 插件包不能包含main.js、App.vue、manifest.json、pages.json文件，大家HBuilder新建uni-app项目（默认模板即可），再把下载的包导入项目根目录。
```js
├─cloudfunctions //uniCloud云平台相关
├─common           // 公共函数方法
├─components       // 公共组件
├─pages            // vue所有页面目录
│  ├─douyin         // 
│  │   └─index.vue
├─static          // 静态资源
├─template.h5.html// 自定义html模板
├─main.js         // js入口文件
├─App.vue         // 页面入口文件
├─manifest.json   // 应用的配置文件
├─pages.json      // 全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等
├─package.json    // 配置
└─uni.scss        // css
```


## 打包目录（不可自定义）
```js
\douyin\unpackage\dist\build\h5
```