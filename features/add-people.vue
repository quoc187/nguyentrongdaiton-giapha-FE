<script setup lang="ts">
import type { UserInput } from "~/interfaces/user/input"
import type { Family } from "~/components/c/add-family.vue"
import AddMe from "~/components/c/add-me.vue"
import AddFamily from "~/components/c/add-family.vue"
import { AddPeopleStep, useAddPeopleStore } from "~/stores/add-people"

const store = useAddPeopleStore()

const onMeAdded = (data: UserInput) => {
  store.setMe(data)
  store.switchStep(AddPeopleStep.Family)
}

const onFamilySubmit = (data: Family) => {
  store.setFamily(data.wife, data.children)

  alert("ADDED BOTH")
}

const onFamilyBack = (data: Family) => {
  console.log("DD", data)
  store.setFamily(data.wife, data.children)
  store.switchStep(AddPeopleStep.Me)
}
</script>

<template>
  <AddMe
    v-if="store.step === AddPeopleStep.Me"
    :initial-values="store.me"
    @submit="onMeAdded"
  />
  <AddFamily
    v-if="store.step === AddPeopleStep.Family && store.me"
    :me="store.me"
    :initial-values="store.family"
    @submit="onFamilySubmit"
    @cancel="onFamilyBack"
  />
</template>
