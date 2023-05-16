<template>
  <BasicModal v-bind="$attrs" title="打回原因">
    <slot></slot>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal } from '@/components/Modal';
</script>
