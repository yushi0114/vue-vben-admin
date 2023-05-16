import { FormSchema, useForm } from '@/components/Form/index';

export const useFixInvoiceForm = () => {
  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'DatePicker',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
      },
      label: '修正时间',
      colProps: {
        span: 24,
      },
      helpMessage: '保存后Invoice文件被重新生成！',
    },
  ];
  const [registerForm, { getFieldsValue, resetFields }] = useForm({
    labelWidth: 120,
    schemas,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  return {
    registerForm,
    getFieldsValue,
    resetFields,
  };
};
