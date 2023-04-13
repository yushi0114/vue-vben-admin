<template>
  <PageWrapper title="项目管理" contentFullHeight fixedHeight>
    <VxeBasicTable ref="tableRef" v-bind="gridOptions" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  import { PageWrapper } from '@/components/Page';
  import { VxeBasicTable, VxeGridInstance } from '@/components/VxeTable';

  import { useVxeTable } from './hook/useVxeTable';

  const tableRef = ref<VxeGridInstance>();

  const { gridOptions } = useVxeTable(tableRef);
</script>
