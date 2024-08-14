<script setup lang="ts">
import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormDescription,
} from "~/components/ui/form"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { userInputSchema, type UserInput } from "~/interfaces/user/input"
import { useAppI18n, ref } from "#imports"
import UiContainer from "~/components/ui/ui-container.vue"
import VStack from "~/components/ui/v-stack.vue"
import { Input } from "~/components/ui/input"
import HStack from "~/components/ui/h-stack.vue"
import { Button } from "~/components/ui/button"

type Props = {
  initialValues?: UserInput
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "submit", data: UserInput): void
  (e: "cancel"): void
}>()

const { t } = useAppI18n()

const validator = toTypedSchema(userInputSchema)
const formRef = ref<HTMLFormElement>()

const form = useForm({
  validationSchema: validator,
  initialValues: props.initialValues,
})

const onSubmit = form.handleSubmit(
  (data) => emit("submit", data),
  (error) => {
    if (!formRef.value) {
      return
    }

    const firstErrEl = Array.from(formRef.value.elements).find((el) => {
      const name = el.getAttribute("name")

      return name && name in error.errors
    }) as HTMLElement | undefined

    firstErrEl?.focus()
  },
)

const fileInputRef = ref<HTMLInputElement>()

const openFilePicker = () => {
  fileInputRef.value?.click()
}
</script>

<template>
  <UiContainer class="h-screen bg-slate-200">
    <form ref="formRef" class="flex flex-col h-full" @submit.prevent="onSubmit">
      <h3 class="text-h3 text-center">
        {{ t("my_info") }}
      </h3>

      <VStack class="mt-6 justify-self-start gap-3">
        <div
          class="relative rounded-md border border-slate-900 bg-slate-200 shadow h-[100px]"
          @click="openFilePicker"
        >
          <span class="text-h4 absolute h-fit inset-0 m-auto text-center">
            {{ t("click_to_add_image") }}
          </span>
          <input
            ref="fileInputRef"
            accept=".jpg,.jpeg,.png"
            type="file"
            hidden
          />
        </div>

        <FormField v-slot="{ componentField, errorMessage }" name="full_name">
          <FormItem>
            <FormLabel>
              {{ t("full_name") }}
            </FormLabel>
            <FormControl>
              <Input placeholder="Nguyễn Văn A" v-bind="componentField" />
            </FormControl>
            <FormDescription v-if="errorMessage" class="text-xs">
              {{ t(errorMessage) }}
            </FormDescription>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="phone">
          <FormItem>
            <FormLabel>
              {{ t("phone_number") }}
            </FormLabel>
            <FormControl>
              <Input placeholder="0123456789" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="job">
          <FormItem>
            <FormLabel>
              {{ t("job") }}
            </FormLabel>
            <FormControl>
              <Input placeholder="Giáo viên" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="address">
          <FormItem>
            <FormLabel>
              {{ t("address") }}
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Thôn Đại Lự, Hồng Lộc, Lộc Hà"
                v-bind="componentField"
              />
            </FormControl>
          </FormItem>
        </FormField>
      </VStack>

      <HStack class="gap-3 mt-auto">
        <Button
          variant="outline"
          size="lg"
          class="text-lg w-full"
          @click="$emit('cancel')"
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
