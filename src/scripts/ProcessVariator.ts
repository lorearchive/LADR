export default function ProcessVariator( dialogue: string ): string {

    // Text has delay?
    if (/\[wa:\d+\]/.test(dialogue)) {
        dialogue = dialogue.replace(/\[wa:\d+\]/g, "")
    }

    // text has custom colouring?

    const variator_colour_regex = /^\[[0-9A-Fa-f]{6}\].*?\[-\]$/              // Matches EXACTLY "[HEXADECIMAL]...[-]"
    const variator_colour_regexCapture = /^\[([0-9A-Fa-f]{6})\](.*?)\[-\]$/;
    const variator_colour_generalRegex = /\[([0-9A-Fa-f]{6})\](.*?)\[-\]/g;   // Matches GENERALLY "...[HEXADECIMAL]...[-]..."
    let variator_colour = "0";                                                // The captured hex code, defaulted at 0 to check if it has been changed later
    let variator_colouredText: string;                                        // The captured text to colour

    if (variator_colour_regex.test(dialogue)) {

        let matches = variator_colour_regexCapture.exec(dialogue) as RegExpExecArray;
        variator_colour = matches[1];
        variator_colouredText = matches[2];

        dialogue = `<span class="colouredText" style="color: #${variator_colour} ">${variator_colouredText}</span>`;
    
    } else if (variator_colour_generalRegex.test(dialogue)) {
        dialogue = dialogue.replace(variator_colour_generalRegex, (_, hex, text) => {
            return `<span class="colouredText" style="color: #${hex} ">${text}</span>`;
        });
    }


    //text has ruby?

    if (dialogue.includes("[ruby=")) {
        dialogue = dialogue.replace(/\[ruby=(.*?)\](.*?)\[\/ruby\]/g, (_, small, base) => {
            return `<ruby>${base}<rp>(</rp><rt>${small}</rt><rp>)</rp></ruby>`;
        });
    }

    // text has forced newline?
    if (dialogue.includes("#n")) {
        dialogue = dialogue.replace(/#n/g, "<br />");
    }

    return dialogue
}