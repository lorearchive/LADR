import { goto } from "$app/navigation"

export function load() {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        // Check if window is not undefined. This makes sure that the code is executed in the browser only.
        
        const lang = navigator.language.split('-')[0]
        
        goto(`/${lang}/home`)
    }
}