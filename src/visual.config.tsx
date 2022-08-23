import { createVisualEditorConfig } from './visual-editor/visual-editor.utils';
import baseWidgets from '@/packages/base-widgets';
import containerComponent from '@/packages/container-component';

// 存储所有组件容器
export const visualConfig = createVisualEditorConfig();
// 遍历基础组件后在组件容器中注册基础组件
Object.entries(baseWidgets).forEach(([name, widget]) =>
  visualConfig.registry('baseWidgets', name, widget),
);
// 注册容器组件
Object.entries(containerComponent).forEach(([name, widget]) =>
  visualConfig.registry('containerComponents', name, widget),
);

console.log(
  `%c成功加载组件数量:${Object.keys(visualConfig.componentMap).length}`,
  'color:#409EFF;background-color:#ecf5ff;padding:0 10px;line-height:2;margin-bottom:4px;',
);

console.log('visualConfig:', visualConfig);
