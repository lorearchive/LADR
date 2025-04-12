import type { PageServerLoad } from './$types'
import GetEpisode from '../../../../../../scripts/GetEpisode';

export const load: PageServerLoad = async ({ url }) => {

    const dir = url.pathname.split("/").filter(Boolean)
    const volume = dir[2]
    const chapter = dir[3]
    const episode = dir[4]
    let sector

    if (episode.includes("-")) {
        sector = episode.split("-")[1]
    } else {
        sector = "1"
    }
    
    const list = await GetEpisode(volume, chapter, episode, sector)
    
    return {
        post: {
            contents: list,
            dir: dir,
        }
    } 
}