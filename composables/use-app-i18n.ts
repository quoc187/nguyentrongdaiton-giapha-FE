import type vi from "~/lang/vi.json"

export const useAppI18n = () => useI18n<[typeof vi], "vi" | "en">()
