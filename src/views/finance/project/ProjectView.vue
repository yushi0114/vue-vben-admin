<template>
  <PageWrapper
    title="项目详情"
    content="201505-00130_BP_ProjectName30173"
    contentFullHeight
    fixedHeight
    contentBackground
  >
    <Description @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { type Recordable } from '@vben/types';

  import { DescItem, Description, useDescription } from '@/components/Description/index';
  import { PageWrapper } from '@/components/Page';

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
      label: '客户名称',
      span: 2,
    },
    {
      field: 'ECI项目名称',
      label: '昵称',
      render: (curVal, data) => {
        return `${data.username}-${curVal}`;
      },
      span: 2,
    },
    {
      field: 'phone',
      label: 'ECI项目编号',
      span: 1,
    },
    {
      field: 'email',
      label: '结算币种',
      span: 1,
    },
    {
      field: 'addr',
      label: 'ECI项目总金额',
      span: 1,
    },
    {
      field: 'addr',
      label: 'ECI项目占用PO金额',
      span: 1,
    },
    {
      field: 'addr',
      label: '已开Invoice金额',
      span: 1,
    },
    {
      field: 'addr',
      label: 'ECI项目已收金额',
      span: 1,
    },
    {
      field: 'addr',
      label: 'ECI项目负责人',
      span: 1,
    },
    {
      field: 'addr',
      label: 'ECI项目创建时间',
      span: 1,
    },
    {
      field: 'addr',
      label: '计划交付时间',
      span: 1,
    },
    {
      field: 'addr',
      label: 'ECI项目状态',
      span: 1,
    },
  ];
  const [register] = useDescription({
    title: '基本信息',
    column: 2,
    data: mockData,
    schema: schema,
  });
</script>
