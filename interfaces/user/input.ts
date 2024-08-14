import * as z from "zod"

export const userInputSchema = z.object({
  full_name: z
    .string({ required_error: "please_enter.full_name" })
    .trim()
    .min(1, "please_enter.full_name"),
  phone: z.string().optional(),
  address: z.string().optional(),
  job: z.string().optional(),
  avatar: z.instanceof(Blob).optional(),
})

export type UserInput = z.infer<typeof userInputSchema>
