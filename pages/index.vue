<script setup lang="ts">
  import AddMe from '~/features/add/add-me.vue';

  const count = ref(0)

  const increase = () => {
    count.value++;
  }
</script>

<template>
  <AddMe />
</template>