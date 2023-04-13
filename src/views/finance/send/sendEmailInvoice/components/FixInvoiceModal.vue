<template>
  <BasicModal v-bind="$attrs" title="修正Invoice">
    <slot></slot>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal } from '@/components/Modal';
</script>
