import { promiseTimeout } from '@vueuse/shared';
import type { Ref } from 'vue';

import { useModal } from '@/components/Modal';
import { VxeGridInstance } from '@/components/VxeTable';
import { useMessage } from '@/hooks/web/useMessage';

import { useFixInvoiceForm } from './useForm';

export const useFixInvoiceModal = (tableRef: Ref<VxeGridInstance | undefined>) => {
  const { createMessage } = useMessage();
  const [registerFixInvoiceModal, { closeModal, openModal, setModalProps }] = useModal();
  const { registerForm: registerFixInvoiceForm, getFieldsValue, resetFields } = useFixInvoiceForm();
  const handleFixInvoiceTimeOk = async () => {
    setModalProps({
      confirmLoading: true,
    });
    const returnReason = getFieldsValue();
    console.log('returnReason: ', returnReason);
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
  return {
    registerFixInvoiceModal,
    registerFixInvoiceForm,
    handleFixInvoiceTimeOk,
    openFixInvoiceTimeModal: openModal,
  };
};

export const useEmailInfoModal = (tableRef: Ref<VxeGridInstance | undefined>) => {
  const { createMessage } = useMessage();
  const [registerEmailInfoModal, { closeModal, openModal, setModalProps }] = useModal();
  const { registerForm: registerEmailInfoForm, getFieldsValue, resetFields } = useFixInvoiceForm();
  const handleEmailInfoOk = async () => {
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
  return {
    registerEmailInfoModal,
    registerEmailInfoForm,
    handleEmailInfoOk,
    openEmailInfoModal: openModal,
  };
};
