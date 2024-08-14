import type vi from "~/lang/vi.json"
import { useI18n } from "#imports"

export const useAppI18n = () => useI18n<[typeof vi], "vi" | "en">()
