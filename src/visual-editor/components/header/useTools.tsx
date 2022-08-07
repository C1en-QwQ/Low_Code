// import { reactive } from 'vue';
// import { ElMessage, ElRadio, ElRadioGroup } from 'element-plus';
import {
  DocumentCopy,
  Cellphone,
  RefreshLeft,
  RefreshRight,
  Position,
  Delete,
  ChatLineSquare,
  Download,
  Upload,
} from '@element-plus/icons-vue';

import 'element-plus/es/components/message/style/css';

export const useTools = () => {
  return [
    {
      title: '导入JSON',
      icon: Upload,
    },
    {
      title: '导出JSON',
      icon: Download,
    },
    {
      title: '真机预览',
      icon: Cellphone,
    },
    {
      title: '复制页面',
      icon: DocumentCopy,
    },
    {
      title: '撤销',
      icon: RefreshLeft,
    },
    {
      title: '恢复',
      icon: RefreshRight,
    },
    {
      title: '清空',
      icon: Delete,
    },
    {
      title: '预览',
      icon: Position,
    },
    {
      title: '反馈',
      icon: ChatLineSquare,
    },
  ];
};
