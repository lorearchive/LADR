import { create } from "zustand"

// used for user preferences

type Preferences = {
    lang: string,
    setLang: (value: string) => void
}



export const usePrefStore = create<Preferences>((set) => ({
    lang: "en",
    setLang:(value) => {
        set({ lang: value })
    }
}))
