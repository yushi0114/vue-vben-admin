import { reactive, type Ref, ref } from 'vue';
import { VxeFormItemProps, VxeGridPropTypes } from 'vxe-table';

import { demoListApi } from '@/api/demo/table';
import { BasicTableProps, VxeGridInstance } from '@/components/VxeTable';
import { useMessage } from '@/hooks/web/useMessage';

const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    title: 'ECI项目名称',
    field: 'name',
    width: 150,
  },
  {
    title: 'ECI项目编号',
    field: 'name',
    width: 150,
  },
  {
    title: '免费类型',
    field: 'address',
    width: 100,
  },
  {
    title: '客户简称',
    field: 'no',
    width: 100,
  },
  {
    title: '签约组织主体',
    width: 150,
    field: 'name1',
    titlePrefix: { message: 'CRM客户为销售签约主体，正式客户为收款主体' },
  },
  {
    title: '项目状态',
    width: 150,
    field: 'name1',
  },
  {
    title: '项目负责人',
    width: 150,
    field: 'name1',
  },
  {
    title: '项目负责人签约主体',
    width: 150,
    field: 'name1',
  },
  {
    title: '预计结束日期',
    width: 150,
    field: 'name1',
    formatter: 'formatDate',
  },
  {
    title: '实际交付时间',
    width: 150,
    field: 'name1',
    formatter: 'formatDate',
  },
  {
    title: '项目关闭时间',
    width: 150,
    field: 'name1',
    formatter: 'formatDate',
  },
];

const vxeTableFormSchema: VxeFormItemProps[] = [
  {
    field: 'field0',
    title: '客户简称',
    itemRender: {
      name: 'AInput',
    },
    span: 5,
  },
  {
    field: 'field3',
    title: 'ECI项目编号',

    itemRender: {
      name: 'AInput',
    },
    span: 5,
  },

  {
    field: 'field7',
    title: 'ECI PM',

    itemRender: {
      name: 'AInput',
    },
    span: 5,
  },
  {
    field: 'field7',
    title: 'ECI项目名称',

    itemRender: {
      name: 'AInput',
    },
    span: 5,
  },
  {
    span: 4,
    align: 'right',
    className: '!float-right !pr-0',
    itemRender: {
      name: 'AButtonGroup',
      children: [
        {
          props: { type: 'primary', content: '查询', htmlType: 'submit' },
          attrs: { class: 'mr-2' },
        },
        { props: { type: 'default', htmlType: 'reset', content: '重置' } },
      ],
    },
  },
];
export function useVxeTable(tableRef: Ref<VxeGridInstance | undefined>) {
  const { createMessage } = useMessage();

  const collapseStatus = ref(true);

  const gridOptions = reactive<BasicTableProps>({
    id: 'VxeTable',
    showOverflow: true,
    keepSource: true,
    sortConfig: {
      trigger: 'cell',
      remote: true,
      defaultSort: {
        field: 'name',
        order: 'desc',
      },
    },
    filterConfig: {
      remote: true,
    },
    columns: vxeTableColumns,
    toolbarConfig: {
      buttons: [
        {
          buttonRender: {
            name: 'ToolbarButtonDownload', // 导出按钮
            props: {
              type: 'primary', // 导出按钮类型
            },
            content: '导出数据', // 导出按钮文字
          },
        },
      ],
      export: false,
      refresh: true,
      print: false,
    },
    formConfig: {
      // titleWidth: 100,
      titleAlign: 'right',
      enabled: true,
      collapseStatus: collapseStatus.value,
      items: vxeTableFormSchema,
    },
    height: 'auto',
    proxyConfig: {
      sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
      filter: true, // 启用筛选代理，当点击筛选时会自动触发 query 行为
      form: true, // 启用表单代理，当点击表单提交按钮时会自动触发 reload 行为
      // 对应响应结果 { result: { items: [], total: 100} }
      props: {
        result: 'items', // 配置响应结果列表字段
        total: 'total', // 配置响应结果总页数字段
      },
      ajax: {
        // 当点击工具栏查询按钮或者手动提交指令 query或reload 时会被触发
        query: async ({ page, sorts, form }) => {
          const queryParams: Recordable = Object.assign({}, form);
          // 处理排序条件
          const firstSort = sorts[0];
          if (firstSort) {
            queryParams.sort = firstSort.field;
            queryParams.order = firstSort.order;
          }
          return demoListApi({
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            ...queryParams,
          });
        },
        queryAll: async ({ form }) => {
          return await demoListApi(form);
        },
      },
    },
    exportConfig: {
      remote: true,
      types: ['xlsx'],
      modes: ['current', 'selected', 'all'],
      // 自定义服务端导出
      exportMethod() {
        const $grid = tableRef.value;
        const proxyInfo = $grid?.getProxyInfo();
        createMessage.success('导出成功');
        return Promise.resolve(proxyInfo);
      },
    },
  });

  return {
    gridOptions,
  };
}
