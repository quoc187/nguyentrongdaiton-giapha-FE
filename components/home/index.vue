<script setup lang="ts">
import { useAppI18n } from '~/composables/use-app-i18n'

const { t } = useAppI18n()

</script>

<template>
  <UiContainer class="h-screen text-center flex flex-col justify-between">
    <UiVstack class="gap-12 mt-8">
      <h2 class="text-h3 uppercase font-bold">
        {{ t("nguyen_trong_dai_ton") }}
      </h2>

      <h1 class="text-h1 uppercase font-bold">
        {{ t("genealogy") }}
      </h1>
    </UiVstack>

    <UiButton size="lg" class="text-lg">
      {{ t("click_to_add") }}
    </UiButton>
  </UiContainer>
</template>