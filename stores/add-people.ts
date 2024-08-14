import { defineStore } from "#imports"
import type { UserInput } from "~/interfaces/user/input"

export const KEY = "add-people" as const

export enum AddPeopleStep {
  Me,
  Family,
}

export const useAddPeopleStore = defineStore(KEY, {
  state: () => ({
    step: AddPeopleStep.Me as AddPeopleStep,
    me: undefined as UserInput | undefined,
    family: {
      wife: undefined as UserInput | undefined,
      children: [] as UserInput[],
    },
  }),
  actions: {
    switchStep(step: AddPeopleStep) {
      this.step = step
    },
    setFamily(wife?: UserInput, children?: UserInput[]) {
      this.family = {
        wife,
        children: children ?? [],
      }
    },
    setMe(me?: UserInput) {
      this.me = me
    },
  },
})
