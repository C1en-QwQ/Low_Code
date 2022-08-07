import { App, Component } from 'vue';
import 'element-plus/dist/index.css';

// 引入组件
import {
  ElAside,
  ElButton,
  ElCol,
  ElContainer,
  ElHeader,
  ElIcon,
  ElInfiniteScroll,
  ElLoading,
  ElMain,
  ElPopover,
  ElRow,
  ElTabs,
  ElTooltip,
} from 'element-plus';

// 注册组件
const components = [
  ElButton,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElRow,
  ElCol,
  ElIcon,
  ElTooltip,
  ElPopover,
  ElTabs,
];

// 注册插件
const plugins = [ElLoading, ElInfiniteScroll];

export function setupElementPlus(app: App) {
  components.forEach((component: Component) => {
    app.component(component.name!, component);
  });
  plugins.forEach((plugin) => {
    app.use(plugin);
  });
}
