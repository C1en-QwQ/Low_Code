import { getCurrentInstance } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

// 全局属性接口
interface GlobalProperties {
  $$refs: any;
  $route: RouteLocationNormalizedLoaded;
  $router: Router;
}

export const useGlobalProperties = () => {
  // 获取全局属性
  const globalProperties = getCurrentInstance()!.appContext.config
    .globalProperties as GlobalProperties;

  // 根据元素和属性中的_vid获取组件的属性
  const registerRef = (el, _vid: string) => el && (globalProperties.$$refs[_vid] = el);

  return {
    globalProperties,
    registerRef,
  };
};
