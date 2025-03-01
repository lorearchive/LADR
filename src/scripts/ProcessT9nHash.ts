import { useParams } from "react-router-dom"
import xxhash from "xxhashjs"

import NameLookup from "../../data/ExcelTable/ScenarioCharacterNameExcelTable.json"

export default function ProcessT9nHash({ NameKR }: { NameKR: string | undefined }) {

    const { lang } = useParams<{ lang: string }>()
    const DataList = NameLookup.DataList


    if (NameKR) {
        const hashedName = Number(xxhash.h32(NameKR, 0).toString())

        const MatchedObj = DataList.find(obj => obj.CharacterName === hashedName)

        if (!MatchedObj) {
            throw new Error("LADR: MatchedObj seems to be undefined.")
        }

        switch (lang) {
            case "en":
                return MatchedObj.NameEN
            default:
                throw new Error("LADR: Not ready for this language yet.")
        }

    } else {
        throw new Error("LADR: NameKR for T9nHash is undefined.")
    }
}