<!--页面树-->
<template>
  <el-button
    type="primary"
    class="!my-10px !mx-6px"
    :icon="Plus"
    @click="addPage"
  >添加页面</el-button>
  <el-tree
    :data="pages"
    :props="defaultProps"
    node-key="path"
    highlight-current
    :current-node-key="currentNodeKey"
    @node-click="handleNodeClick"
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span>
          {{ node.label }}（{{ data.path }}）
          <template v-if="data.isDefault">
            <el-tag size="default">默认</el-tag>
          </template>
        </span>
        <span @click.stop>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <el-icon><more-filled /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Edit" @click="editPage(data)">编辑</el-dropdown-item>
                <el-dropdown-item :icon="Delete" @click="delPage(data)">删除</el-dropdown-item>
                <el-dropdown-item
                  :icon="Link"
                  @click="setDefaultPage(data)"
                >
                  设为首页
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </span>
    </template>
  </el-tree>
</template>

<script lang="tsx" setup>
  import { ref, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { ElMessage, ElForm, ElFormItem, ElInput } from 'element-plus';
  import { Tickets, Plus, MoreFilled, Edit, Delete, Link } from '@element-plus/icons-vue';
  import type { VisualEditorPage } from '@/visual-editor/visual-editor.utils';
  import { useModal } from '@/visual-editor/hooks/useModal';
  import { useVisualData, createNewPage } from '@/visual-editor/hooks/useVisualData';

  defineOptions({
    name: 'PageTree',
    label: '页面',
    order: 1,
    icon: Tickets,
  });

  // 表单验证规则
  const rules = {
    title: [{ required: true, message: '请输入页面标题', trigger: 'blur' }],
    path: [{ required: true, message: '请输入页面路径', trigger: 'blur' }],
  };

  const router = useRouter();
  const route = useRoute();

  // 通过解构得到需要的几个方法和网站的JSON数据
  const { jsonData, setCurrentPage, deletePage, updatePage, incrementPage } = useVisualData();

  const ruleFormRef = ref<InstanceType<typeof ElForm>>();

  const defaultProps = ref({
    children: 'children',
    label: 'title',
  });
  const currentNodeKey = ref(route.path);
  // 当前要增加或修改的页面
  const operatePageData = ref<VisualEditorPage | null>(null);
  // 增改页面表单数据
  const form = ref({
    title: '',
    path: '',
  });

  // 所有的页面数据（其中包含页面的路径与标题）
  const pages = computed(() =>
    Object.keys(jsonData.pages).map((key) => ({
      title: jsonData.pages[key].title,
      path: key,
    })),
  );

  // 点击当前节点（点击设置默认页面，即当前操作的页面）
  const handleNodeClick = (data) => {
    setCurrentPage(data.path);
    router.push(data.path);
  };

  /**
   * @description 显示新增/编辑模态框
   */
  const showOparateModal = () =>
    useModal({
      // 根据当前操作页面中的值更改标题
      title: operatePageData.value ? '编辑页面' : '新增页面',
      props: {
        width: 380,
      },
      // 对话框中的内容
      content: () => (
        <ElForm ref={ruleFormRef} model={form.value} rules={rules}>
          <ElFormItem prop={'title'} label={'页面标题'} labelWidth={'80px'}>
            <ElInput v-model={form.value.title} />
          </ElFormItem>
          <ElFormItem prop={'path'} label={'页面路径'} labelWidth={'80px'}>
            <ElInput v-model={form.value.path} />
          </ElFormItem>
        </ElForm>
      ),
      onConfirm: () => {
        return new Promise((resolve, reject) => {
          ruleFormRef.value?.validate(async (valid) => {
            if (valid) {
              const { title, path } = form.value;
              // 如果路径或标题中有为空（消除输入的为空格的情况）
              if ([title.trim(), path.trim()].includes('')) {
                return ElMessage.error('标题或路径不能为空！');
              }
              // 如果存在数据更新页面，不存在的话新建页面
              if (operatePageData.value) {
                updatePage({
                  newPath: path,
                  oldPath: operatePageData.value.path || path,
                  page: { title },
                });
                // 更新后替换路由
                await router.replace(path);
                currentNodeKey.value = path;
              } else {
                // 添加并创建新页面
                incrementPage(path, createNewPage({ title }));
              }
              resolve(true);
            } else {
              console.log('error submit!!');
              reject();
              return false;
            }
          });
        });
      },
    });

  // 新增页面
  const addPage = () => {
    operatePageData.value = null;
    form.value = {
      title: '',
      path: '',
    };
    showOparateModal();
  };
  // 编辑页面
  const editPage = (data) => {
    operatePageData.value = data;
    form.value = {
      title: data.title,
      path: data.path,
    };
    showOparateModal();
    console.log('子页面数据：', data);
  };
  // 删除子页面
  const delPage = (data) => {
    console.log('删除子页面数据', data);
    deletePage(data.path, '/');
  };
  // 设置为默认页面
  const setDefaultPage = (data) => {
    console.log('设置该页面为默认页面', data);
  };
</script>

<style lang="scss" scoped>
  .custom-tree-node {
    display: flex;
    padding-right: 8px;
    font-size: 14px;
    flex: 1;
    align-items: center;
    justify-content: space-between;
  }
</style>
