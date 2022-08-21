import { reactive } from 'vue';
import { ElMessage, ElRadio, ElRadioGroup } from 'element-plus';
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
import { useVisualData, localKey } from '@/visual-editor/hooks/useVisualData';
import { useModal } from '@/visual-editor/hooks/useModal';
import MonacoEditor from '@/visual-editor/components/common/monaco-editor/MonacoEditor';


export const useTools = () => {
  const { jsonData, updatePage, currentPage, overrideProject } = useVisualData();
  const state = reactive({
    coverRadio: 'current',
    importJsonValue: '',
  });
  const importJsonChange = (value) => {
    state.importJsonValue = value;
  };

  return [
    {
      title: '导入JSON',
      icon: Upload,
      onClick: () => {
        useModal({
          title: '导入JSON',
          props: {
            width: 642,
          },
          content: () => (
            <>
              <ElRadioGroup v-model={state.coverRadio}>
                <ElRadio label="current">覆盖当前页面</ElRadio>
                <ElRadio label="all">覆盖整个项目</ElRadio>
              </ElRadioGroup>
              <MonacoEditor
                onChange={importJsonChange}
                code={JSON.stringify(jsonData)}
                layout={{ width: 600, height: 600 }}
              />
            </>
          ),
          onConfirm: () => {
            const isCoverCurrent = state.coverRadio == 'current';
            // 覆盖当前页面
            if (isCoverCurrent) {
              updatePage({
                oldPath: currentPage.value.path,
                page: JSON.parse(state.importJsonValue),
              });
            } else {
              // 覆盖整个项目
              overrideProject(JSON.parse(state.importJsonValue));
            }
            ElMessage({
              showClose: true,
              type: 'success',
              duration: 2000,
              message: isCoverCurrent ? '成功覆盖当前页面' : '成功覆盖整个项目',
            });
          },
        });
      },
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
