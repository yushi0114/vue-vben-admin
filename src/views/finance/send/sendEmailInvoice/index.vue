<template>
  <PageWrapper title="电子邮件发送Invoice" contentFullHeight fixedHeight>
    <VxeBasicTable ref="tableRef" v-bind="gridOptions" />
    <FixInvoiceModal @register="registerFixInvoiceModal" @ok="handleFixInvoiceTimeOk">
      <BasicForm @register="registerFixInvoiceForm" />
    </FixInvoiceModal>

    <EmailInfoModal @register="registerEmailInfoModal" @ok="handleEmailInfoOk">
      <BasicForm @register="registerEmailInfoForm" />
    </EmailInfoModal>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  import { BasicForm } from '@/components/Form/index';
  import { PageWrapper } from '@/components/Page';
  import { VxeBasicTable, VxeGridInstance } from '@/components/VxeTable';

  import EmailInfoModal from './components/EmailInfoModal.vue';
  import FixInvoiceModal from './components/FixInvoiceModal.vue';
  import { useEmailInfoModal, useFixInvoiceModal, useVxeTable } from './hook';

  const tableRef = ref<VxeGridInstance>();
  const {
    registerFixInvoiceModal,
    registerFixInvoiceForm,
    handleFixInvoiceTimeOk,
    openFixInvoiceTimeModal,
  } = useFixInvoiceModal(tableRef);
  const { registerEmailInfoModal, registerEmailInfoForm, handleEmailInfoOk, openEmailInfoModal } =
    useEmailInfoModal(tableRef);
  const { gridOptions } = useVxeTable(tableRef, { openFixInvoiceTimeModal, openEmailInfoModal });
</script>
