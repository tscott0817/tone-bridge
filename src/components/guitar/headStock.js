import React, {useEffect} from 'react';
import { useNoteContext } from "../../stateManager/NoteContext";
import { Note } from "tonal";

const Headstock = () => {
    const { selectedNotes, selectNote, unselectNote, rootNote } = useNoteContext();

    // Define the strings and their corresponding MIDI note numbers
    // TODO: Need to make strings changable
    const strings = [
        { string: 1, midiNote: 64 }, // High E
        { string: 2, midiNote: 59 }, // B
        { string: 3, midiNote: 55 }, // G
        { string: 4, midiNote: 50 }, // D
        { string: 5, midiNote: 45 }, // A
        { string: 6, midiNote: 40 }  // Low E
    ];

    // Function to handle string click
    const handleStringClick = (note) => {
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
        // This is just to the guitar updates every time a new note is added outside of the guitar component
    }, [selectedNotes]);

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
