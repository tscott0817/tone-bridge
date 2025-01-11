import React, {useEffect, useState} from 'react';
import {useNoteContext} from "../../../stateManager/NoteContext";
import {Note, Scale} from "tonal";
import {emptyNoteColor} from "../../../stateManager/lightMode";
import {useThemeContext} from "../../../stateManager/ThemeContext";
import * as lightColors from "../../../stateManager/lightMode";
import * as darkColors from "../../../stateManager/darkMode";

const Headstock = ({ openNotesProp, showOctave }) => {
    const { selectedNotes, selectNote, unselectNote, scaleDegrees, chordDegrees } = useNoteContext();
    const [openNotes, setOpenNotes] = useState(openNotesProp);
    const {theme} = useThemeContext();

    useEffect(() => {
        setOpenNotes(openNotesProp);
    }, [openNotesProp]);

    const strings = [
        { string: 1, midiNote: openNotes[5] }, // High E
        { string: 2, midiNote: openNotes[4] }, // B
        { string: 3, midiNote: openNotes[3] }, // G
        { string: 4, midiNote: openNotes[2] }, // D
        { string: 5, midiNote: openNotes[1] }, // A
        { string: 6, midiNote: openNotes[0] }, // Low E
    ];

    const setNoteColor = (note) => {
        const noteString = note.substring(0, note.length - 1); // Always remove the octave

        let degreeColors = {};
        let scaleDegree = null;

        if (Object.keys(scaleDegrees).length > 0) {
            degreeColors = {
                root: '#f29f99',
                second: 'teal',
                third: 'teal',
                fourth: 'teal',
                fifth: 'teal',
                sixth: 'teal',
                seventh: 'teal',
            };
            scaleDegree = Object.keys(scaleDegrees).find(key => scaleDegrees[key] === noteString);
        }

        // Optionally handle chord degrees if needed
        if (Object.keys(chordDegrees || {}).length > 0) {
            degreeColors = {
                root: '#f29f99',
                third: 'teal',
                fifth: 'teal',
                seventh: 'teal',
                ninth: 'teal',
                eleventh: 'teal',
                thirteenth: 'teal',
            };
            scaleDegree = Object.keys(chordDegrees).find(key => chordDegrees[key] === noteString);
        }

        const isSelected = selectedNotes.includes(note);
        if (isSelected && scaleDegree) {
            return degreeColors[scaleDegree] || 'teal';
        } else if (isSelected) {
            return 'teal';
        } else {
            return emptyNoteColor;
        }
    };

    const handleStringClick = (note) => {
        if (selectedNotes.includes(note)) {
            unselectNote(note);
        } else {
            selectNote(note);
        }
    };

    return (
        <div
            className="headstock"
            style={{
                backgroundColor: theme === lightColors ? lightColors.headStockColor : darkColors.headStockColor,
                position: 'relative',
                width: '100%',
                height: '100%', // Set a fixed height for the parent container
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', // Space the strings evenly
                alignItems: 'center', // Center the strings horizontally
            }}
        >
            {strings.map(({string, midiNote}, index) => {
                const note = Note.name(Note.fromMidi(midiNote));
                const displayNote = showOctave ? note : note.substring(0, note.length - 1); // Adjust display based on showOctave
                const stringStyle = {
                    // width: '35px',
                    // height: '47.5px',
                    width: '50px',
                    height: '50px',
                    border: '1px solid black',
                    // borderRadius: '25%',
                    borderRadius: '50%',
                    backgroundColor: setNoteColor(note),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: index === 0 ? '5px' : '0', // Add margin only to the first note
                    marginBottom: index === strings.length - 1 ? '7.5px' : '0', // Add margin only to the last note
                };

                return (
                    <div
                        key={string}
                        className="headstock-string"
                        style={stringStyle}
                        onClick={() => handleStringClick(note)}
                    >
                        {selectedNotes.includes(note) && (
                            <div
                                className="note-circle"
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {displayNote} {/* Display the note based on showOctave */}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Headstock;
