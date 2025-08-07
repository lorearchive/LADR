import type { PageLoad } from './$types'
import GetEpisode from '../../../../../../scripts/GetEpisode';
import type { rawToken } from '../../../../../../scripts/ProcessEpisode';

export const load: PageLoad = async ({ url }) => {

    const dir = url.pathname.split("/").filter(Boolean)
    const volume = dir[2]
    const chapter = dir[3]
    const episode = dir[4]
    let sector

    // Check for sector request
    if (episode.includes("-")) {
        sector = episode.split("-")[1]
    } else {
        sector = "1" // Probably what most users want
    }
    
    const list: rawToken[] = await GetEpisode( volume, chapter, episode, sector, "normal" )
    console.log(list)
    
    return {
        story: {
            dataList: list
        }
    }
}