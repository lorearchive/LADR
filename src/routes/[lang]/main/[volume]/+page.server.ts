import type { PageServerLoad } from './$types'
import GetDirectory from '../../../../scripts/GetDirectory'; // amazing path

export const load: PageServerLoad = async ({ url }) => {

    const dir = url.pathname.split("/").filter(Boolean)
    const volume = dir[2] // [0] is lang, [1] is main, [2] is volume, [3] is chapter
    const chapter = dir[3]

    
    const list = await GetDirectory("main", volume)
    
    return {
        post: {
            contents: list,
            dir: dir,
        }
    } 
    

};