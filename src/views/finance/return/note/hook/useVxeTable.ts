import { reactive, type Ref, ref } from 'vue';
import { VxeFormItemProps, VxeGridPropTypes } from 'vxe-table';

import { optionsListApi } from '@/api/demo/select';
import { demoListApi } from '@/api/demo/table';
import { BasicTableProps, VxeGridInstance } from '@/components/VxeTable';
import { useMessage } from '@/hooks/web/useMessage';
import { openWindow, setObjToUrlParams } from '@/utils';

const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    title: '客户',
    field: 'name',
    width: 150,
  },
  {
    title: 'Invoice号',
    field: 'address',
    width: 150,
    cellRender: {
      name: 'ALink',
      events: {
        click: ({ row }) => {
          openWindow(
            setObjToUrlParams('#/capital-finance/collecting/project-view', { id: row.id }),
          );
        },
      },
    },
  },
  {
    title: '所属分公司',
    width: 150,
    field: 'name1',
  },
  {
    title: 'Invoice负责人',
    width: 150,
    field: 'name1',
  },
  {
    title: '打回人',
    width: 150,
    field: 'name1',
  },
  {
    title: '打回时间',
    width: 150,
    field: 'name1',
    formatter: 'formatDateTime',
  },
  {
    title: '打回时币种',
    width: 150,
    field: 'name1',
  },
  {
    title: '打回时Invoice总金额',
    width: 150,
    field: 'name1',
    formatter: 'formatAmount',
  },
  {
    title: '打回说明',
    width: 150,
    field: 'name1',
  },
];

const vxeTableFormSchema: VxeFormItemProps[] = [
  {
    field: 'field0',
    title: '客户',
    itemRender: {
      name: 'AInput',
    },
    span: 5,
  },
  {
    field: 'field1',
    title: '所属分公司',
    itemRender: {
      name: 'AApiSelect',
      props: {
        api: optionsListApi,
        resultField: 'list',
        labelField: 'name',
        valueField: 'id',
      },
    },
    span: 5,
  },
  {
    field: 'field1',
    title: '币种',
    itemRender: {
      name: 'AApiSelect',
      props: {
        api: optionsListApi,
        resultField: 'list',
        labelField: 'name',
        valueField: 'id',
      },
    },
    span: 5,
  },
  {
    field: 'field3',
    title: '打回人',

    itemRender: {
      name: 'AInput',
    },
    span: 5,
  },
  {
    span: 4,
    align: 'right',
    className: '!pr-0',
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
  {
    field: 'field3',
    title: 'Invoice号',

    itemRender: {
      name: 'AInput',
    },
    span: 5,
  },
  {
    field: 'field3',
    title: '打回起始时间',

    itemRender: {
      name: 'ADatePicker',
      attrs: {
        class: 'w-full',
      },
      props: {
        valueFormat: 'YYYY-MM-DD',
      },
    },
    span: 5,
  },
  {
    field: 'field6',
    title: '打回截止时间',

    itemRender: {
      name: 'ADatePicker',
      attrs: {
        class: 'w-full',
      },
      props: {
        valueFormat: 'YYYY-MM-DD',
      },
    },
    span: 5,
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
      modes: ['all'],
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
