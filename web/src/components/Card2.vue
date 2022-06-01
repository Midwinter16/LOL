<template>
  <div class="bg-white py-3">
    <div class="card-2-header w-100 mb-4">
      <span class="title fs-xl ml-2 pl-2">{{ title }}</span>
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
  },
};
</script>

<style scoped>
.title {
  border-left: 5px solid black;
}
</style>
