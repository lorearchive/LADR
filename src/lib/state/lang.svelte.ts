function GetLang() {
    let lang = $state(navigator.language.split("-")[0])

    return {
        get lang() {
            return lang
        },
        change(newLang: string) {
            lang = newLang
        }
    }
}

export const LangStore = GetLang()