import React, { useEffect, useMemo, useState } from 'react';
import { useNoteContext } from "../../stateManager/NoteContext";
import { Note } from "tonal";
import woodImage from '../../img/wood.png';


// TODO: Open Notes should probably not be a prop
const Neck = ({ openNotesProp }) => {
    const { selectedNotes, selectNote, unselectNote, scaleDegrees, chordDegrees, clearSelectedNotes } = useNoteContext();
    const [openNotes, setOpenNotes] = useState(openNotesProp);  // Top of fretboard handle a bit differently


    useEffect(() => {
        setOpenNotes(openNotesProp);
    }, [openNotesProp]);

    const numFrets = 12;

    const useSharps = useMemo(() =>
            selectedNotes.some(note => note.includes('#')),
        [selectedNotes]
    );

    const stringNotes = useMemo(() => {
        //console.log(useSharps);
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
        }
        else {
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
    }, [openNotes, selectedNotes]);

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

        // Get the note without the octave
        const noteString = note.substring(0, note.length - 1);

        let degreeColors = {};
        let scaleDegree = null;

        // If scaleDegrees are set, map the note to the scale degree
        if (Object.keys(scaleDegrees).length > 0) {
            degreeColors = {
                /*root: 'red',     // 1st degree
                second: 'orange', // 2nd degree
                third: 'yellow', // 3rd degree
                fourth: 'green', // 4th degree
                fifth: 'blue',   // 5th degree
                sixth: 'indigo', // 6th degree
                seventh: 'violet', // 7th degree*/

                root: '#f29f99',     // 1st degree
                second: 'teal', // 2nd degree
                third: 'teal', // 3rd degree
                fourth: 'teal', // 4th degree
                fifth: 'teal',   // 5th degree
                sixth: 'teal', // 6th degree
                seventh: 'teal', // 7th degree
            };
            scaleDegree = Object.keys(scaleDegrees).find(key => scaleDegrees[key] === noteString);
        }

        // // If chordDegrees are set, map the note to the chord degree
        if (Object.keys(chordDegrees).length > 0) {
            degreeColors = {
                root: 'red',     // 1st degree
                third: 'yellow', // 3rd degree
                fifth: 'blue',   // 5th degree
                seventh: 'violet', // 7th degree
                ninth: 'green',  // 9th degree
                eleventh: 'purple', // 11th degree
                thirteenth: 'indigo', // 13th degree
            };
            scaleDegree = Object.keys(chordDegrees).find(key => chordDegrees[key] === noteString);
        }

        const isSelected = selectedNotes.includes(note);
        if (isSelected && scaleDegree) {
            return degreeColors[scaleDegree] || '#e6d595';
        } else if (isSelected) {
            return '#e6d595';
        } else {
            return 'rgba(168, 193, 221, 0.8)';
        }
    };
    useEffect(() => {}, [selectedNotes, scaleDegrees, chordDegrees]);

    return (
        <div className="neck" style={{
            backgroundColor: '#a36233',
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
                            backgroundColor: 'black',
                        }}
                    ></div>
                ))}
            </div>
            {[1, 2, 3, 4, 5, 6].map((stringIndex) => (
                <div key={stringIndex}>
                    {Array.from({ length: numFrets }, (_, i) => i).map((fret, index) => {
                        const note = calculateNote(fret, stringIndex);
                        const leftPosition = `${(fret + 0.5) * (100 / numFrets)}%`;
                        const noteHeight = (stringIndex - 1) * (100 / 6) + 15 / 2;
                        const left = index === 0 ? `calc(${leftPosition} - 22.5px)` : `calc(${leftPosition} - 22.5px)`;
                        const noteStyle = {
                            position: 'absolute',
                            left: left,
                            transform: 'translateY(-50%)',
                            top: `${noteHeight}%`,
                            width: '45px',
                            height: '45px',
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
                                        {selectedNotes.includes(note) && note}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    <div
                        className="string-horizontal"
                        style={{
                            backgroundColor: ` #ffffff`,
                            marginTop: '22.5px',
                            height: '5px',
                            width: '105.3%',
                            position: 'absolute',
                            right: 0,
                            top: `${(stringIndex - 1) * (100 / 6)}%`,
                            zIndex: 1
                        }}
                    ></div>
                </div>
            ))}
        </div>
    );
};

export default Neck;