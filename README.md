# 介绍

目前来说，写了基础的一个框架，技术栈采用的是vite + vue3 + typescript。

## 项目

具体看package中的配置即可

* run

```
//装好依赖再来run
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

### 2022.08.21

完成了组件的拖拽和H5页面容器，整体的实现其实就是一个JSON数据。

**踩坑如下：**

1. 一直出现整个页面无法显示的原因，打开调试器发现显示没有jsonData，然而实际在编写过程中，已经编写了，在经过一段时间的debug工作后，发现是因为没有将编写的jsonData的default值通过组件通信在APP.vue中进行导入。
2. 没有在每次写完代码后进行上传工作，因此在囤积了大量的代码后，出现问题后，发现没有办法很好地进行版本回调，在此警醒自己注意进行代码的上传工作。


### 2022.08.23

1. 完成了页面的切换功能，其实就是利用路由进行切换，但是这个方法感觉并不是很好，以后可以看看有没有更好的方法；
2. 完成了右侧属性栏的功能显示，弹框存在bug，没有达到想要的样式。
3. 补充了对之前代码的注释。

### 2022.08.25

1. 完成了预览功能的开发工作，方法是在再写一个preview目录用于设置新的路由，之后根据本地缓存的数据进行渲染；
2. 导入JSON功能存在BUG，无法实现导入JSON数据后实时渲染；
3. 总体来说基本功能已经实现，之后要做的就是进行数据模型绑定开发工作，因为时间问题暂时不做；
4. 增加文字组件、图片组件、容器组件。
