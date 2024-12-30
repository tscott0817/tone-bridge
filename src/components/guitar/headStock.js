import React, { useEffect, useState } from 'react';
import { useNoteContext } from "../../stateManager/NoteContext";
import { Note, Scale } from "tonal";

const Headstock = ({ openNotesProp }) => {
    const { selectedNotes, selectNote, unselectNote, scaleDegrees } = useNoteContext();
    const [openNotes, setOpenNotes] = useState(openNotesProp);

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
        // Get the note without the octave
        const noteString = note.substring(0, note.length - 1);

        // Match the note to a scale degree
        const scaleDegree = Object.keys(scaleDegrees).find(key => scaleDegrees[key] === noteString);

        // Assign colors based on the scale degree
        const degreeColors = {
/*            root: 'red',
            second: 'orange',
            third: 'yellow',
            fourth: 'green',
            fifth: 'blue',
            sixth: 'indigo',
            seventh: 'violet',*/

            root: '#f29f99',     // 1st degree
            second: 'teal', // 2nd degree
            third: 'teal', // 3rd degree
            fourth: 'teal', // 4th degree
            fifth: 'teal',   // 5th degree
            sixth: 'teal', // 6th degree
            seventh: 'teal', // 7th degree
        };

        const isSelected = selectedNotes.includes(note);

        if (isSelected && scaleDegree) {
            return degreeColors[scaleDegree] || 'teal'; // Default to teal for unmatched degrees
        } else if (isSelected) {
            return 'teal'; // Default for selected notes not in the scale
        } else {
            return 'rgba(168, 193, 221, 0.8)'; // Default for unselected notes
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
        <div className="headstock" style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'relative',
            width: '100%',
        }}>
            {strings.map(({ string, midiNote }) => {
                const note = Note.name(Note.fromMidi(midiNote));
                const stringStyle = {
                    width: '45px',
                    height: '45px',
                    border: '1px solid black',
                    borderRadius: '50%',
                    backgroundColor: setNoteColor(note),
                    margin: 'auto',
                    marginTop: '2px',
                    marginBottom: '7px',
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
                                    backgroundColor: 'transparent',
                                    margin: 'auto',
                                    marginTop: '10px',
                                }}
                            >
                                {note}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Headstock;

