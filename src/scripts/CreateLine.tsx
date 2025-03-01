import React, { JSX } from "react";
import { useParams } from "react-router-dom";
import ProcessT9nHash from "./ProcessT9nHash.ts";


export function LangNotReadyYetError():string {
    throw new Error("LADR: Not ready for this language yet.")
}


export function CreateHtmlLine({ type, dialogue, speaker, fontsize, TextEn }: { type: string; dialogue: string; speaker?: string; fontsize?: number, TextEn?: string }): JSX.Element {
  
    const { lang } = useParams<{ lang: string }>()

    switch(type) {

        case "normal":

            switch (lang) {
                case "ko":
                    if (fontsize === undefined) {
                        return (
                            <div className="flex p-2 rounded noto-serif-kr">
                                <div id="speaker" className="flex justify-end flex-shrink-0 w-40 mr-2">
                                    <p className="font-semibold text-right text-gray-600">{speaker}:</p>
                                </div>
                                <div id="dialogue">
                                    <q dangerouslySetInnerHTML={{__html: dialogue}}></q>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div className="flex p-2 rounded noto-serif-kr">
                                <div id="speaker" className="flex justify-end flex-shrink-0 w-40 mr-2">
                                    <p className="font-semibold text-right text-gray-600">{speaker}:</p>
                                </div>
                                <div id="dialogue">
                                    <q style={{ fontSize: fontsize + "em" }} className="alteredFontsize/" dangerouslySetInnerHTML={{__html: dialogue}}></q>
                                </div>
                            </div>
                        )
                    }
                case "en":
                    if (fontsize === undefined && TextEn) {
                        return (
                            <div className="flex p-2 rounded noto-serif-kr">
                                <div id="speaker" className="flex justify-end flex-shrink-0 w-40 mr-2">
                                    <p className="font-semibold text-right text-gray-600">{ProcessT9nHash({NameKR: speaker})}:</p>
                                </div>
                                <div id="dialogue">
                                    <q dangerouslySetInnerHTML={{__html: TextEn}}></q>
                                </div>
                            </div>
                        );
                    } else if (fontsize !== undefined && TextEn) {
                        return (
                            <div className="flex p-2 rounded noto-serif-kr">
                                <div id="speaker" className="flex justify-end flex-shrink-0 w-40 mr-2">
                                    <p className="font-semibold text-right text-gray-600">{ProcessT9nHash({NameKR: speaker})}:</p>
                                </div>
                                <div id="dialogue">
                                    <q style={{ fontSize: fontsize + "em" }} className="alteredFontsize/" dangerouslySetInnerHTML={{__html: TextEn}}></q>
                                </div>
                            </div>
                        )
                    } else {
                        throw new Error("LADR: TextEn is undefined. Is your lang set as en?")
                    }
            }

        case "noSpeaker":

            if (fontsize === undefined) {
                return (
                    <div className="flex p-2 rounded noto-serif-kr">
                        <div id="speakerSpace" className="flex justify-end flex-shrink-0 w-40 mr-2">
                        </div>
                        <div id="dialogue">
                            <q dangerouslySetInnerHTML={{__html: dialogue}}></q>
                        </div>
                    </div>
                );

            } else {
                return (
                    <div className="flex p-2 rounded noto-serif-kr">
                        <div id="speakerSpace" className="flex justify-end flex-shrink-0 w-40 mr-2">
                        </div>
                        <div id="dialogue">
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
            // checking for speaker undefined when it is a narration?? look into that perhaps
            switch (lang) {
                case "ko":
                    if (fontsize === undefined) {
                        if (speaker === undefined) {
                            return (
                                <div className="flex p-2 rounded noto-serif-kr">
                                    <div id="speakerSpace" className="flex justify-end flex-shrink-0 w-40 mr-2">
                                    </div>
                                    <div id="narration" className="flex justify-end flex-shrink-0">
                                        <q className="text-gray-400" dangerouslySetInnerHTML={{__html: dialogue}}></q>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="flex p-2 rounded noto-serif-kr">
                                    <div className="flex justify-end flex-shrink-0 w-40 mr-2" />
                                    <div id="narration" className="flex justify-end flex-shrink-0">
                                        <q className="text-gray-400" dangerouslySetInnerHTML={{__html: dialogue}}></q>
                                    </div>
                                </div>
                            )
                        }
        
                    } else {
                        if (speaker === undefined) {
                            return (
                                <div className="flex p-2 rounded noto-serif-kr">
                                    <div id="speakerSpace" className="flex justify-end flex-shrink-0 w-40 mr-2">
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
                case "en":
                    if (fontsize === undefined) {
                        if (speaker === undefined) {
                            return (
                                <div className="flex p-2 rounded noto-serif-kr">
                                    <div id="speakerSpace" className="flex justify-end flex-shrink-0 w-40 mr-2">
                                    </div>
                                    <div id="narration" className="flex justify-end flex-shrink-0">
                                        <q className="text-gray-400" dangerouslySetInnerHTML={{__html: TextEn? TextEn : LangNotReadyYetError()}}></q>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="flex p-2 rounded noto-serif-kr">
                                    <div className="flex justify-end flex-shrink-0 w-40 mr-2" />
                                    <div id="narration" className="flex justify-end flex-shrink-0">
                                        <q className="text-gray-400" dangerouslySetInnerHTML={{__html: TextEn ? TextEn : LangNotReadyYetError()}}></q>
                                    </div>
                                </div>
                            )
                        }
        
                    } else {
                        if (speaker === undefined) {
                            return (
                                <div className="flex p-2 rounded noto-serif-kr">
                                    <div id="speakerSpace" className="flex justify-end flex-shrink-0 w-40 mr-2">
                                    </div>
                                    <div id="narration" className="flex justify-end flex-shrink-0">
                                        <q className="text-gray-400" style={{ fontSize: fontsize + "em" }} dangerouslySetInnerHTML={{__html: TextEn ? TextEn : LangNotReadyYetError()}}></q>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="flex p-2 rounded noto-serif-kr">
                                    <div className="flex justify-end flex-shrink-0 w-40 mr-2" />
                                    <div id="narration" className="flex justify-end flex-shrink-0">
                                        <q className="text-gray-400" style={{ fontSize: fontsize + "em" }} dangerouslySetInnerHTML={{__html: TextEn ? TextEn : LangNotReadyYetError()}}></q>
                                    </div>
                                </div>
                            )
                        }
                        
                    }

            }

        default:
            throw new Error("Invalid line type passed to CreateHtmlLine(): " + type)
    }
}


