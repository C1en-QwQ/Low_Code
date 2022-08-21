import { getCurrentInstance } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

interface GlobalProperties {
  $$refs: any;
  $route: RouteLocationNormalizedLoaded;
  $router: Router;
}

export const useGlobalProperties = () => {
  const globalProperties = getCurrentInstance()!.appContext.config
    .globalProperties as GlobalProperties;

  const registerRef = (el, _vid: string) => el && (globalProperties.$$refs[_vid] = el);

  return {
    globalProperties,
    registerRef,
  };
};
