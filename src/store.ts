import { create } from "zustand"

// used for user preferences

type Preferences = {
    lang: string,
    setLang: (value: string) => void
}

type Directory = {
    volume: string,
    setVolume: (value: string) => void,
    chapter: string,
    setChapter: (value: string) => void,
    episode: string,
    setEpisode: (value: string) => void,
    sector: string,
    setSector: (value: string) => void
    
}


export const usePrefStore = create<Preferences>((set) => ({
    lang: "en",
    setLang:(value) => {
        set({ lang: value })
    }
}))

export const useDirStore = create<Directory>((set) => ({
    volume: "1",
    setVolume: (value) => {
        set({ volume: value})
    },
    chapter: "1",
    setChapter: (value) => {
        set({ chapter: value})
    },
    episode: "1",
    setEpisode: (value) => {
        set({ episode: value})
    },
    sector: "1",
    setSector: (value) => {
        set({ sector: value})
    },
    
}))