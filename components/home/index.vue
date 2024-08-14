<script setup lang="ts">
import HStack from "~/components/ui/h-stack.vue"
import VStack from "~/components/ui/v-stack.vue"
import { useAppI18n } from "~/composables/use-app-i18n"

const { t } = useAppI18n()
</script>

<template>
  <HStack class="h-screen text-center flex flex-col justify-between">
    <VStack class="gap-12 mt-8">
      <h2 class="text-h3 uppercase font-bold">
        {{ t("nguyen_trong_dai_ton") }}
      </h2>

      <h1 class="text-h1 uppercase font-bold">
        {{ t("genealogy") }}
      </h1>
    </VStack>

    <UiButton size="lg" class="text-lg">
      {{ t("click_to_add") }}
    </UiButton>
  </HStack>
</template>
