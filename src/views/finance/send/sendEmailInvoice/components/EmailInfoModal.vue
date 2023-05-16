<template>
  <BasicModal v-bind="$attrs" width="80%" title="电子邮件发送Invoice" @register="registerModal">
    <Description @register="registerClientInfo" />
    <VxeBasicTable ref="tableRef" v-bind="gridOptions" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { type Recordable } from '@vben/types';
  import { ref } from 'vue';

  import { DescItem, Description, useDescription } from '@/components/Description/index';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { VxeBasicTable, VxeGridInstance } from '@/components/VxeTable';

  import { useEmailInfoTable } from '../hook';

  const tableRef = ref<VxeGridInstance>();
  const { gridOptions } = useEmailInfoTable(tableRef);
  const mockData: Recordable = {
    username: 'test',
    nickName: 'VB',
    age: '123',
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
  };
  const schema: DescItem[] = [
    {
      field: 'username',
      label: '客户',
      span: 1,
    },
    {
      field: 'ECI项目名称',
      label: '币种',
      span: 1,
    },
    {
      field: 'phone',
      label: 'Invoice金额',
      span: 1,
    },
    {
      field: 'email',
      label: '发票类型',
      span: 1,
    },
  ];
  const [registerClientInfo] = useDescription({
    title: '基本信息',
    column: 2,
    data: mockData,
    schema: schema,
  });

  const [registerModal] = useModalInner((data) => {
    data && onDataReceive(data);
  });

  function onDataReceive(data) {
    mockData.username = data.name;
  }
</script>
