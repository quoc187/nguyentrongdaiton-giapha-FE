<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { userInputSchema, type UserInput } from "~/interfaces/user/input"
import * as z from "zod"
import { ref, toRaw, useAppI18n } from "#imports"
import { FormField, FormFieldArray } from "~/components/ui/form"
import VStack from "~/components/ui/v-stack.vue"
import { Button } from "~/components/ui/button"
import UiContainer from "~/components/ui/ui-container.vue"
import HStack from "~/components/ui/h-stack.vue"
import AddFamilyMember from "~/components/c/add-family-member.vue"

export type Family = z.infer<typeof schema>

type Props = {
  initialValues?: Family
  me: UserInput
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "submit" | "cancel", data: Family): void
}>()

const schema = z.object({
  wife: userInputSchema.optional(),
  children: z.array(userInputSchema),
})

const { t } = useAppI18n()

const validator = toTypedSchema(schema)
const formRef = ref<HTMLFormElement>()

const form = useForm({
  validationSchema: validator,
  initialValues: props.initialValues,
})

const onSubmit = form.handleSubmit((data) => emit("submit", data), console.log)
</script>

<template>
  <UiContainer class="min-h-screen bg-slate-200 flex flex-col">
    <form
      ref="formRef"
      class="flex flex-col h-full grow justify-between"
      @submit.prevent="onSubmit"
    >
      <h3 class="text-h3 text-center">
        {{ t("family_info") }}
      </h3>

      <VStack class="mt-6 justify-self-start gap-3">
        <HStack class="gap-6">
          <div class="w-20 h-20 rounded-md border border-slate-900 shadow" />
          <VStack>
            <p class="text-large">
              {{ props.me.full_name }}
            </p>
            <p v-if="props.me.phone" class="text-large text-muted-foreground">
              {{ props.me.phone }}
            </p>
          </VStack>
        </HStack>

        <FormField v-slot="{ setValue, value }" name="full_name">
          <VStack class="gap-3">
            <p class="text-h4">
              {{ t("wife") }}
            </p>

            <AddFamilyMember
              v-if="value"
              :value="value"
              @remove="() => setValue(undefined)"
            />

            <HStack v-else class="justify-center">
              <Button
                @click="
                  setValue({
                    full_name: 'Cong chua nho',
                    phone: '0123456',
                  } as UserInput)
                "
              >
                {{ t("add_wife") }}
              </Button>
            </HStack>
          </VStack>
        </FormField>

        <FormFieldArray v-slot="{ fields, push, remove }" name="children">
          <VStack class="gap-2">
            <p class="text-h4 mt-1">
              {{ t("children") }}
            </p>
            <template v-for="field in fields" :key="field.key">
              <AddFamilyMember
                :value="field.value as UserInput"
                @remove="remove(fields.length - 1)"
              />
            </template>

            <HStack class="justify-center pt-1">
              <Button
                @click="
                  push({
                    full_name: 'Cong chua nho ' + fields.length,
                    phone: '0123456',
                  } as UserInput)
                "
              >
                {{ t("add_child") }}
              </Button>
            </HStack>
          </VStack>
        </FormFieldArray>
      </VStack>

      <HStack class="gap-3 mt-auto pt-3">
        <Button
          variant="outline"
          size="lg"
          class="text-lg w-full"
          @click="$emit('cancel', toRaw(form.values) as Family)"
        >
          {{ t("back") }}
        </Button>
        <Button type="submit" size="lg" class="text-lg w-full">
          {{ t("continue") }}
        </Button>
      </HStack>
    </form>
  </UiContainer>
</template>
