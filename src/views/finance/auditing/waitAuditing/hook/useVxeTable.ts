import { promiseTimeout } from '@vueuse/shared';
import { reactive, type Ref, ref } from 'vue';
import { VxeFormItemProps, VxeGridPropTypes } from 'vxe-table';
import XEUtils from 'xe-utils';

import { optionsListApi } from '@/api/demo/select';
import { demoListApi } from '@/api/demo/table';
import { useModal } from '@/components/Modal';
import { BasicTableProps, VxeGridInstance } from '@/components/VxeTable';
import { useMessage } from '@/hooks/web/useMessage';
import { openWindow, setObjToUrlParams } from '@/utils';

import { useReturnForm } from '../hook/useForm';

const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    type: 'checkbox',
    width: 50,
  },
  {
    title: '客户全称',
    field: 'name',
    width: 150,
  },
  {
    title: '客户简称',
    field: 'name',
    width: 150,
    sortable: true,
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
    title: 'Invoice号',
    field: 'address',
    width: 150,
    sortable: true,
  },
  {
    title: '是否发送税务',
    field: 'name',
    width: 150,
    formatter: 'formatSwitch',
  },
  {
    title: '客户PO号(附件)',
    field: 'address',
    width: 100,
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
    title: 'ECI项目编号',
    field: 'address',
    width: 100,
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
    title: '客户PM',
    width: 150,
    field: 'name1',
  },
  {
    title: '分公司',
    width: 150,
    field: 'name1',
  },
  {
    title: '币种',
    width: 150,
    field: 'name1',
  },
  {
    title: 'Invoice总金额',
    width: 150,
    field: 'name1',
    formatter: 'formatAmount',
    sortable: true,
  },
  {
    title: 'ECI项目总金额',
    width: 150,
    field: 'name1',
    formatter: 'formatAmount',
  },
  {
    title: '收支核算',
    width: 150,
    field: 'name1',
  },
  {
    title: '危险状态',
    width: 150,
    field: 'name1',
  },
  {
    title: 'Invoice状态',
    width: 150,
    field: 'name1',
  },
  {
    title: '创建人',
    width: 150,
    field: 'name1',
  },
  {
    title: '提交时间',
    width: 150,
    formatter: 'formatDateTime',
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
    title: 'Invoice号',

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
    title: '客户PO号',

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
    field: 'field6',
    title: 'Invoice总金额',

    itemRender: {
      name: 'AInput',
    },
    span: 5,
  },
  {
    field: 'field7',
    title: '创建人',

    itemRender: {
      name: 'AInput',
    },
    span: 5,
  },
];
export function useVxeTable(tableRef: Ref<VxeGridInstance | undefined>) {
  const { createMessage, createConfirm } = useMessage();
  const [registerModal, { closeModal, openModal, setModalProps }] = useModal();
  const { registerForm, getFieldsValue, resetFields } = useReturnForm();
  const handleOk = async () => {
    setModalProps({
      confirmLoading: true,
    });
    getFieldsValue();
    // TODO: 调取打回接口
    await promiseTimeout(1000);
    await createMessage.destroy();
    createMessage.success('打回成功');
    resetFields();
    setModalProps({
      confirmLoading: false,
    });
    closeModal();
    tableRef.value?.commitProxy('reload');
  };

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
          content: 'Invoice审核内容',
          buttonRender: {
            name: 'AButton',
            props: {
              type: 'primary',
              preIcon: 'ant-design:info-circle-filled',
            },
            events: {
              click: () => {
                const selectedData = tableRef.value?.getCheckboxRecords(true);
                if (XEUtils.isEmpty(selectedData)) {
                  createMessage.destroy();
                  createMessage.warning('请选择一条Invoice！');
                  return false;
                }
                if (selectedData!.length > 1) {
                  createMessage.destroy();
                  createMessage.warning('只能选择一个Invoice！');
                  return false;
                }
                openWindow(
                  setObjToUrlParams('#/capital-finance/collecting/project-view', {
                    id: selectedData![0].id,
                  }),
                );
              },
            },
          },
        },
        {
          content: '通过',
          buttonRender: {
            name: 'AButton',
            props: {
              preIcon: 'ant-design:file-done-outlined',
            },
            events: {
              click: () => {
                const selectedData = tableRef.value?.getCheckboxRecords(true);
                if (XEUtils.isEmpty(selectedData)) {
                  createMessage.destroy();
                  createMessage.warning('请至少选择一条Invoice！');
                  return false;
                }
                createConfirm({
                  title: '提示',
                  content: `确定要通过选中的${selectedData!.length}条审批？`,
                  onOk() {
                    // TODO: 调取后台接口
                    createMessage.destroy();
                    createMessage.success('审批Invoice成功');
                    tableRef.value?.commitProxy('reload');
                  },
                });
              },
            },
          },
        },
        {
          code: 'reload',
          content: '打回',
          buttonRender: {
            name: 'AButton',
            props: {
              preIcon: 'ant-design:exception-outlined',
            },
            events: {
              click: () => {
                const selectedData = tableRef.value?.getCheckboxRecords(true);
                if (XEUtils.isEmpty(selectedData)) {
                  createMessage.destroy();
                  createMessage.warning('请至少选择一条Invoice！');
                  return false;
                }
                // createConfirm({
                //   title: '提示',
                //   content: `确定要通过选中的${selectedData!.length}条审批？`,
                //   onOk: async () => {
                //     // TODO: 调取后台接口
                //     createMessage.destroy();
                //     createMessage.success('已打回');
                //     tableRef.value?.commitProxy('reload');
                //   },
                // });
                openModal(true);
              },
            },
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
    registerModal,
    registerForm,
    handleOk,
  };
}
