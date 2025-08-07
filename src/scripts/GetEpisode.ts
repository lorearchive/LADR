export default async function GetEpisode( vol: string, ch: string, ep: string, st: string, type: string ) {

    const fetchEpisode = async () => {

        let url
        let sectorNoInFile = st === "1" ? "0" : "5"
        // This is the sector: either 0 (if s = 1) or 5 (if s = 2)

        switch (type) { // story type to fetch. Mostly deals with if file names are search-able with this pattern: (vol)(ch)(ep)(sectorNoInFile).json
            case "normal":
                url = `https://raw.githubusercontent.com/lorearchive/ladr-json/main/Volume${vol}/Chapter${ch}/${vol}${ch}${ep}${sectorNoInFile}.json`
                break

            default:
                throw new Error("LADR: GetEpisode received invalid episode type: " + type)

        }

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