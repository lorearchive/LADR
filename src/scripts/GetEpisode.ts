export default async function GetEpisode( vol: string, ch: string, ep: string, st: string ) {

    const fetchEpisode = async ( ) => {

        let sectorNoInFile = st === "1" ? "0" : "5"
        // This is the sector: either 0 (if s = 1) or 5 (if s = 2)

        let url = `https://raw.githubusercontent.com/lorearchive/ladr-json/main/Volume${vol}/Chapter${ch}/${vol}${ch}${ep}${sectorNoInFile}.json`
        const response = await fetch(url)

        
        if (!response.ok) {
            console.log(url);
            throw new Error(`Failed to fetch episode: ${response.status}`);
        }

        const episodeData = await response.json()
        return episodeData.DataList
    }

    return await fetchEpisode()
}