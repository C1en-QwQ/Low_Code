# 介绍

目前来说，写了基础的一个框架，技术栈采用的是vite + vue3 + typescript。

## 项目

具体看package中的配置即可

* run

```
npm run dev
```

## 技术栈 

* 编程语言： typescript + JavaScript
* 构建工具： vite
* 前端框架： vue3
* 路由工具： vue-router
* 状态管理： pinia
* UI框架： element-plus
* CSS预编译： Sass
* 代码规范工具： editorConfig + prettier + eslint

## 参考项目

https://github.com/buqiyuan/vite-vue3-lowcode

https://github.com/woai3c/visual-drag-demo

https://github.com/wangyuan389/mall-cook

## 开发记录

### 2022.08.09

完成了APP框架的整体构建工作，框架由四个大组件构成，分别为头部、侧边栏、编辑器界面、右侧属性控制栏。

**今日踩坑**：

1. 由于直接在GitHub上修改了 README，而忘记了pull指令，因此在上传的时候出现了错误，不得已，将原本的文件夹改名后，重新克隆了GitHub上的文件夹进行重新上传，因此提醒一定要记得每次写之前pull指令。
2. 关于在vite中使用tsx的问题，需要安装插件，不然会导致整个页面无法渲染出来。
3. 关于使用`@apply`之后下方报错的问题，使用stylelint进行解决。
