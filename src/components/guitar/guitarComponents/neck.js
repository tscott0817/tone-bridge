import React, {useEffect, useMemo, useState} from 'react';
import { useNoteContext } from "../../../stateManager/NoteContext";
import { Note } from "tonal";
import woodImage from '../../../img/wood.png';
import {emptyNoteColor, fretColor, neckColor, stringColor} from "../../../stateManager/lightMode";
import * as lightColors from "../../../stateManager/lightMode";
import * as darkColors from "../../../stateManager/darkMode";
import theme from "tailwindcss/defaultTheme";
import {useThemeContext} from "../../../stateManager/ThemeContext";

const Neck = ({ openNotesProp, showOctave }) => {
    const { selectedNotes, selectNote, unselectNote, scaleDegrees, chordDegrees } = useNoteContext();
    const [openNotes, setOpenNotes] = useState(openNotesProp);
    const { theme, toggleTheme } = useThemeContext();

    useEffect(() => {
        setOpenNotes(openNotesProp);
    }, [openNotesProp]);

    const numFrets = 12;

    const useSharps = useMemo(() =>
            selectedNotes.some(note => note.includes('#')),
        [selectedNotes]
    );

    const stringNotes = useMemo(() => {
        let notesArray = [];
        if (useSharps) {
            notesArray = [
                Array.from({ length: 13 }, (_, i) => Note.enharmonic(Note.name(Note.fromMidi(openNotes[5] + 1 + i), { sharps: true }))),
                Array.from({ length: 13 }, (_, i) => Note.enharmonic(Note.name(Note.fromMidi(openNotes[4] + 1 + i), { sharps: true }))),
                Array.from({ length: 13 }, (_, i) => Note.enharmonic(Note.name(Note.fromMidi(openNotes[3] + 1 + i), { sharps: true }))),
                Array.from({ length: 13 }, (_, i) => Note.enharmonic(Note.name(Note.fromMidi(openNotes[2] + 1 + i), { sharps: true }))),
                Array.from({ length: 13 }, (_, i) => Note.enharmonic(Note.name(Note.fromMidi(openNotes[1] + 1 + i), { sharps: true }))),
                Array.from({ length: 13 }, (_, i) => Note.enharmonic(Note.name(Note.fromMidi(openNotes[0] + 1 + i), { sharps: true }))),
            ];
        } else {
            notesArray = [
                Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[5] + 1 + i))),
                Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[4] + 1 + i))),
                Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[3] + 1 + i))),
                Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[2] + 1 + i))),
                Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[1] + 1 + i))),
                Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[0] + 1 + i))),
            ];
        }
        return notesArray;
    }, [openNotes, useSharps]);

    const calculateNote = (fret, string) => {
        const noteIndex = fret % stringNotes[string - 1].length;
        const noteName = stringNotes[string - 1][noteIndex];
        return `${noteName}`;
    };

    const handleFretClick = (note) => {
        if (selectedNotes.includes(note)) {
            unselectNote(note);
        } else {
            selectNote(note);
        }
    };

    const setNoteColor = (note) => {
        // console.log("Setting color for note:", note, "Selected notes:", selectedNotes);
        const noteString = note.substring(0, note.length - 1);

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

        if (Object.keys(chordDegrees).length > 0) {
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

    useEffect(() => {
        console.log('Notes On Neck: ' + selectedNotes);  // Log selectedNotes to check if it's updated correctly
    }, [selectedNotes]);

    return (
        <div className="neck" style={{
            backgroundColor: theme === lightColors ? lightColors.neckColor : darkColors.neckColor,
            position: 'relative',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div className="frets" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                {[...Array(numFrets + 1)].map((_, fretIndex) => (
                    <div
                        key={fretIndex}
                        className="fret"
                        style={{
                            width: '10px',
                            backgroundColor: fretColor,
                        }}
                    ></div>
                ))}
            </div>

            {[1, 2, 3, 4, 5, 6].map((stringIndex) => (
                <div key={stringIndex}>
                    {Array.from({ length: numFrets }, (_, i) => i).map((fret, index) => {
                        const note = calculateNote(fret, stringIndex);
                        const noteToDisplay = showOctave ? note : note.replace(/\d$/, ''); // Remove octave if not displayed
                        const leftPosition = `${(fret + 0.5) * (100 / numFrets)}%`;
                        // const noteHeight = (stringIndex - 1) * (100 / 6) + 15 / 2;
                        const verticalSpacing = 8.0; // Adjust this value for more or less space between rows
                        const noteHeight = (stringIndex - 1) * (100 / 6) + verticalSpacing;
                        const left = index === 0 ? `calc(${leftPosition} - 22.5px)` : `calc(${leftPosition} - 22.5px)`;
                        const noteStyle = {
                            position: 'absolute',
                            left: left,
                            transform: 'translateY(-50%)',
                            top: `${noteHeight}%`,
                            width: '50px',
                            height: '50px',
                            border: '1px solid black',
                            borderRadius: '50%',
                            backgroundColor: setNoteColor(note),
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 2,
                        };

                        return (
                            <div
                                key={fret}
                                className="notes"
                                style={noteStyle}
                                onClick={() => handleFretClick(note)}
                            >
                                {selectedNotes.includes(note) && (
                                    <div
                                        className="note-circle"
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            backgroundColor: 'transparent',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {selectedNotes.includes(note) && noteToDisplay}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    <div
                        className="string-horizontal"
                        style={{
                            backgroundColor: stringColor,
                            marginTop: '22.5px',
                            height: '5px',
                            width: '105.3%',
                            position: 'absolute',
                            right: 0,
                            top: `${(stringIndex - 1) * (100 / 6) + 1.5 }%`,
                            zIndex: 1
                        }}
                    ></div>
                </div>
            ))}
        </div>
    );
};

export default Neck;