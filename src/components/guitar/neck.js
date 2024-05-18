import React, {useEffect, useMemo, useState} from 'react';
import { useNoteContext } from "../../stateManager/NoteContext";
import { Note } from "tonal";
import woodImage from '../../img/wood.png';

const Neck = ({ openNotesProp }) => {
    const { selectedNotes, selectNote, unselectNote, rootNote } = useNoteContext();
    const [openNotes, setOpenNotes] = useState(openNotesProp);
    useEffect(() => {
        setOpenNotes(openNotesProp);
    }, [openNotesProp]);

    const numFrets = 12;

    const stringNotes = useMemo(() => [
        Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[5] + 1 + i))), // Need offset by 1 to get the correct note
        Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[4] + 1 + i))),
        Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[3] + 1 + i))),
        Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[2] + 1 + i))),
        Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[1] + 1 + i))),
        Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[0] + 1 + i))),
    ], [openNotes]);

    const calculateNote = (fret, string) => {
        const noteIndex = (fret) % stringNotes[string - 1].length;
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
        const rootString = rootNote.substring(0, rootNote.length); // Remove the octave number
        const noteString = note.substring(0, note.length - 1); // Remove the octave number
        const isSelected = selectedNotes.includes(note);
        if (isSelected && rootString === noteString) {
            return 'red'; // Highlight root note in red
        } else if (isSelected) {
            return 'teal'; // Highlight other selected notes in teal
        } else {
            return 'rgba(168, 193, 221, 0.8)'; // Default color for unselected notes
        }
    };

    useEffect(() => {

    }, [selectedNotes])

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
                    {Array.from({length: numFrets}, (_, i) => i).map((fret, index) => {
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