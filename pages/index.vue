<script setup lang="ts">
import { useHeadSafe } from "#imports"
import AddPeople from "~/features/add-people.vue"

useHeadSafe({
  title: "Gia pha nguyen trong",
})
</script>

<template>
  <AddPeople />
</template>
