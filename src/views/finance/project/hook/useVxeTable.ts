import { reactive, type Ref, ref } from 'vue';
import { VxeFormItemProps, VxeGridPropTypes } from 'vxe-table';

import { optionsListApi } from '@/api/demo/select';
import { demoListApi } from '@/api/demo/table';
import { BasicTableProps, VxeGridInstance } from '@/components/VxeTable';
import { useMessage } from '@/hooks/web/useMessage';
import { openWindow, setObjToUrlParams } from '@/utils';

export function useVxeTable(tableRef: Ref<VxeGridInstance | undefined>) {
  const { createMessage } = useMessage();
  const vxeTableColumns: VxeGridPropTypes.Columns = [
    {
      title: 'ECI项目名称',
      field: 'name',
      width: 150,
      cellRender: {
        name: 'ALink',
        props: {
          type: 'link',
        },
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
      title: 'ECI项目编号',
      field: 'name',
      width: 150,
      sortable: true,
    },
    {
      title: '结算客户 (全称)',
      field: 'address',
      width: 100,
    },
    {
      title: '结算客户 (简称)',
      field: 'no',
      width: 100,
    },
    {
      title: '客户收款公司',
      width: 150,
      field: 'name1',
    },
    {
      title: '币种',
      width: 150,
      field: 'name1',
    },
    {
      title: 'ECI项目总金额',
      width: 150,
      field: 'name1',
      formatter: 'formatAmount',
    },
    {
      title: 'ECI项目已开Invoice金额',
      width: 150,
      field: 'name1',
      formatter: 'formatAmount',
    },
    {
      title: '项目状态',
      width: 150,
      field: 'name1',
    },
    {
      title: '财务状态',
      width: 150,
      field: 'name1',
    },
    {
      title: '收款状态',
      width: 150,
      field: 'name1',
    },
    {
      title: '所属分公司',
      width: 150,
      field: 'name1',
    },
    {
      title: '	ECI项目负责人',
      width: 150,
      field: 'name1',
    },
    {
      title: '预计结束日期',
      width: 150,
      field: 'name1',
      formatter: 'formatDate',
      sortable: true,
    },
    {
      title: '实际验收时间',
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
      title: '结算客户',
      itemRender: {
        name: 'AInput',
      },
      span: 6,
    },
    {
      field: 'field1',
      title: '参与分公司',
      itemRender: {
        name: 'AApiSelect',
        props: {
          api: optionsListApi,
          resultField: 'list',
          labelField: 'name',
          valueField: 'id',
        },
      },
      span: 6,
    },
    {
      field: 'field3',
      title: 'ECI项目编号',

      itemRender: {
        name: 'AInput',
      },
      span: 6,
    },
    {
      field: 'field4',
      title: '项目状态',
      itemRender: {
        name: 'ASelect',
        options: [],
        optionProps: {
          label: 'label',
          value: 'value',
        },
      },
      span: 6,
      folding: true,
    },
    {
      field: 'field5',
      title: '收款状态',
      itemRender: {
        name: 'ASelect',
        options: [],
        optionProps: {
          label: 'label',
          value: 'value',
        },
      },
      span: 6,
      folding: true,
    },
    {
      field: 'field6',
      title: 'ECI项目名称',

      itemRender: {
        name: 'AInput',
      },
      span: 6,
      folding: true,
    },
    {
      field: 'field7',
      title: 'ECI PM',

      itemRender: {
        name: 'AInput',
      },
      span: 6,
      folding: true,
    },
    {
      field: 'field8',
      title: 'ECI项目金额',

      itemRender: {
        name: 'AInput',
      },
      span: 6,
      folding: true,
    },
    {
      field: 'field9',
      title: '财务状态',
      itemRender: {
        name: 'ASelect',
        options: [],
        optionProps: {
          label: 'label',
          value: 'value',
        },
      },
      span: 6,
      folding: true,
    },
    {
      field: 'field10',
      title: '收款分公司',
      itemRender: {
        name: 'ASelect',
        options: [],
        optionProps: {
          label: 'label',
          value: 'value',
        },
      },
      span: 6,
      folding: true,
    },
    {
      span: 6,
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
      collapseNode: true,
    },
  ];
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
