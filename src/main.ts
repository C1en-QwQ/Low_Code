import { createApp } from 'vue';
import App from './App.vue';

import { setupElementPlus } from './plugins/element-plus';

// 保证跨浏览器高度一致
import 'normalize.css';
import 'virtual:windi.css';
import 'virtual:windi-devtools';
import 'animate.css';

import router from '@/router';
import { setupStore } from './store';

const app = createApp(App);

setupStore(app);
setupElementPlus(app);

app.config.globalProperties.$$refs = {};

app.use(router);
// 路由准备完毕再挂载
router.isReady().then(() => app.mount('#app'));
