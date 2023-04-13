import { FormSchema, useForm } from '@/components/Form/index';

export const useReturnForm = () => {
  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'InputTextArea',
      label: '描述',
      colProps: {
        span: 24,
      },
      defaultValue: '',
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
