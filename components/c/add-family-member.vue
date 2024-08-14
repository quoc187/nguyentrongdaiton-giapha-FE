<script setup lang="ts">
import HStack from "~/components/ui/h-stack.vue"
import type { UserInput } from "~/interfaces/user/input"
import { useAppI18n } from "~/composables/use-app-i18n"
import { Button } from "~/components/ui/button"

type Props = {
  value: UserInput
}

const { value } = defineProps<Props>()
defineEmits<{
  (e: "remove"): void
}>()

const { t } = useAppI18n()
</script>

<template>
  <HStack class="p-1 gap-6 rounded-lg shadow border border-slate-900">
    <div class="w-16 h-16 shrink-0 rounded-md bg-slate-300" />

    <HStack class="items-center justify-between w-full">
      <div class="h-full">
        <p class="text-base">
          {{ value.full_name }}
        </p>
        <p v-if="value?.phone" class="text-base text-muted-foreground">
          {{ value.phone }}
        </p>
      </div>

      <Button class="mr-1" variant="destructive" @click="$emit('remove')">
        {{ t("remove") }}
      </Button>
    </HStack>
  </HStack>
</template>
