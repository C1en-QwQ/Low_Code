import { VisualEditorComponent } from '@/visual-editor/visual-editor.utils';

const modules = import.meta.glob('./*/index.tsx', { eager: true });

console.log('modules:', modules);


const components: Record<string, VisualEditorComponent> = {};

Object.entries(modules).forEach(([key, module]) => {
  // 利用正则表达式来获取需要的组件name
  const name = key.replace(/\.\/(.*)\/index\.(tsx|vue)/, '$1');
  // 将组件中的属性以哈希表方式存入
  components[name] = module?.default || module;
});

// console.log(components, 'base-widgets');
export default components;
