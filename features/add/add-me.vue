<script setup lang="ts">
import { FormField } from '~/components/ui/form'
import * as z from "zod"
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const { t } = useAppI18n()

const fullNameMsg = t("please_enter", { what: t("full_name")})

const schema = z.object({
  full_name: z.string({ required_error: fullNameMsg }).trim().min(1, fullNameMsg),
  phone: z.string().optional(),
  address: z.string().optional(),
  job: z.string().optional(),
})

const validator = toTypedSchema(schema)

const form = useForm({
  validationSchema: validator,
})

const onSubmit = form.handleSubmit(console.log, console.log)

const fileInputRef = ref<HTMLInputElement>()

const openFilePicker = () => {
  console.log("OPENINGF")
  fileInputRef.value?.click()
}

</script>

<template>
  <UiContainer class="h-screen bg-slate-200">
    <form class="flex flex-col h-full" @submit.prevent="onSubmit" >
      <h3 class="text-h3 text-center">
        {{ t("my_info") }}
      </h3>

      <UiVstack class="mt-6 justify-self-start gap-3">
          <div class="relative rounded-md border border-slate-900 bg-slate-200 shadow h-[100px]" @click="openFilePicker">
            <span class="text-h4 absolute h-fit inset-0 m-auto text-center">
              {{ t("click_to_add_image") }}
            </span>
            <input ref="fileInputRef" accept=".jpg,.jpeg,.png" type="file" hidden >
          </div>

          <FormField v-slot="{ componentField, errorMessage }" name="full_name">
            <UiFormItem>
              <UiFormLabel>
                {{ t("full_name") }}
              </UiFormLabel>
              <UiFormControl>
                <UiInput placeholder="Nguyễn Văn A" v-bind="componentField" />
              </UiFormControl>
              <UiFormDescription v-if="errorMessage" class="text-xs">
                {{  errorMessage }}
              </UiFormDescription>
            </UiFormItem>
          </FormField>
          <FormField v-slot="{componentField}" name="phone">
            <UiFormItem>
              <UiFormLabel>
                {{ t("phone_number") }}
              </UiFormLabel>
              <UiFormControl>
                <UiInput placeholder="0123456789" v-bind="componentField" />
              </UiFormControl>
            </UiFormItem>
          </FormField>
          <FormField v-slot="{componentField}" name="job">
            <UiFormItem>
              <UiFormLabel>
                {{ t("job") }}
              </UiFormLabel>
              <UiFormControl>
                <UiInput placeholder="Giáo viên" v-bind="componentField" />
              </UiFormControl>
            </UiFormItem>
          </FormField>
          <FormField v-slot="{componentField}" name="address">
            <UiFormItem>
              <UiFormLabel>
                {{ t("address") }}
              </UiFormLabel>
              <UiFormControl>
                <UiInput placeholder="Thôn Đại Lự, Hồng Lộc, Lộc Hà" v-bind="componentField" />
              </UiFormControl>
            </UiFormItem>
          </FormField>
      </UiVstack>

      <UiHstack class="gap-3 mt-auto">
        <UiButton variant="outline" size="lg" class="text-lg w-full">
          {{ t("back") }}
        </UiButton>
        <UiButton type="submit" size="lg" class="text-lg w-full">
          {{ t("continue") }}
        </UiButton>
      </UiHstack>
    </form>
  </UiContainer>
</template>