<template>
  <div class="mb-3 pb-2 bg-white">
    <div class="mt-3 p-3">
      <i :class="`iconfont icon-${icon}`"></i>
      <strong class="pl-2 fs-xl">{{ title }}</strong>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
