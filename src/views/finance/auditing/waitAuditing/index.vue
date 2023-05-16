<template>
  <PageWrapper title="审批管理" contentFullHeight fixedHeight>
    <VxeBasicTable ref="tableRef" v-bind="gridOptions" />
    <ReturnModal @register="registerModal" @ok="handleOk">
      <BasicForm @register="registerForm" />
    </ReturnModal>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  import { BasicForm } from '@/components/Form/index';
  import { PageWrapper } from '@/components/Page';
  import { VxeBasicTable, VxeGridInstance } from '@/components/VxeTable';

  import ReturnModal from './components/returnModal.vue';
  import { useVxeTable } from './hook/useVxeTable';

  const tableRef = ref<VxeGridInstance>();

  const { gridOptions, registerModal, registerForm, handleOk } = useVxeTable(tableRef);
</script>
