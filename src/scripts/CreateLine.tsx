import React from "react";




export function CreateHtmlLine(type: string, dialogue: string, speaker?: string, fontsize?: number): JSX.Element {


    switch(type) {

        case "normal":

            if (fontsize === undefined) {
                return (
                    <div className="flex p-2 rounded noto-serif-kr">
                        <div id="speaker" className="flex justify-end flex-shrink-0 w-40 mr-2">
                            <p className="font-semibold text-gray-600">{speaker}:</p>
                        </div>
                        <div id="dialogue" className="text-gray-200">
                            <q dangerouslySetInnerHTML={{__html: dialogue}}></q>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="flex p-2 rounded noto-serif-kr">
                        <div id="speaker" className="flex justify-end flex-shrink-0 w-40 mr-2">
                            <p className="font-semibold text-gray-600">{speaker}:</p>
                        </div>
                        <div id="dialogue" className="text-gray-200">
                            <q style={{ fontSize: fontsize + "em" }} className="alteredFontsize/" dangerouslySetInnerHTML={{__html: dialogue}}></q>
                        </div>
                    </div>
                )
            }

        case "noSpeaker":

            if (fontsize === undefined) {
                return (
                    <div className="flex p-2 rounded noto-serif-kr">
                        <div id="speakerSpace" className="flex justify-end flex-shrink-0 w-40 mr-2">
                        </div>
                        <div id="dialogue" className="text-gray-200">
                            <q dangerouslySetInnerHTML={{__html: dialogue}}></q>
                        </div>
                    </div>
                );

            } else {
                return (
                    <div className="flex p-2 rounded noto-serif-kr">
                        <div id="speakerSpace" className="flex justify-end flex-shrink-0 w-40 mr-2">
                        </div>
                        <div id="dialogue" className="text-gray-200">
                            <q style={{ fontSize: fontsize + "em" }} dangerouslySetInnerHTML={{__html: dialogue}}></q>
                        </div>
                    </div>
                );
            }
            

        case "center":
            return (

                <div id="center" className="flex flex-col items-center justify-center rounded noto-serif-kr">
                    <div id="centerText" className="flex justify-center flex-shrink-0 w-6/12 transition-colors">
                        <q dangerouslySetInnerHTML={{__html: dialogue}}>
                        </q>
                    </div>
                </div>

            )
        case "narration":

            if (fontsize === undefined) {

            } else {
                if (speaker === undefined) {
                    return (
                        <div className="flex p-2 rounded noto-serif-kr">
                            <div id="speaker" className="flex justify-end flex-shrink-0 w-40 mr-2">
                                <p className="font-semibold text-gray-600">{speaker}:</p>
                            </div>
                            <div id="narration" className="flex justify-end flex-shrink-0">
                                <q className="text-gray-400" style={{ fontSize: fontsize + "em" }} dangerouslySetInnerHTML={{__html: dialogue}}></q>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="flex p-2 rounded noto-serif-kr">
                            <div className="flex justify-end flex-shrink-0 w-40 mr-2" />
                            <div id="narration" className="flex justify-end flex-shrink-0">
                                <q className="text-gray-400" style={{ fontSize: fontsize + "em" }} dangerouslySetInnerHTML={{__html: dialogue}}></q>
                            </div>
                        </div>
                    )
                }
                
            }
            
        default:
            throw new Error("Invalid line type passed to CreateHtmlLine(): " + type)
    }

}