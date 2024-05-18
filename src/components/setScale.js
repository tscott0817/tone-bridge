import React, {useEffect, useState} from "react";
import {useNoteContext} from "../stateManager/NoteContext"; // Import the NoteContext
import {Scale, ScaleType} from 'tonal';

const SetScale = () => {
    const {selectedNotes, selectNote, unselectNote, setRootNote, rootNote} = useNoteContext(); // Use the NoteContext
    const [keyNote, setKeyNote] = useState("C");
    const [scaleType, setScaleType] = useState("major");

    const handleKeyNoteChange = (event) => {
        setKeyNote(event.target.value);
    };

    const handleScaleTypeChange = (event) => {
        setScaleType(event.target.value);
    };

    const setScale = () => {
        const scaleNotes = Scale.get(`${keyNote} ${scaleType}`).notes.reduce((acc, note) => {
            for (let octave = 1; octave <= 7; octave++) { // Assuming guitar ranges from octave 2 to 6
                acc.push(`${note}${octave}`);
            }
            return acc;
        }, []);

        setRootNote(`${keyNote}`); // Set the root note (keynote

        // Clear the existing selected notes
        selectedNotes.forEach(note => unselectNote(note));

        // Add the notes of the selected scale
        scaleNotes.forEach(note => selectNote(note));
    };

    useEffect(() => {
        // This is just so the guitar updates every time a new note is added outside of the component
    }, [selectedNotes]);

    return (
        <div style={{
            backgroundColor: 'palegoldenrod',
            height: '100%',
            width: "100%",
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px'
        }}>
            <div>
                <label htmlFor="keyNote">Tonic: </label>
                <select id="keyNote" value={keyNote} onChange={handleKeyNoteChange}>
                    {["C", "Db", "C#", "D", "Eb", "D#", "E", "F", "Gb", "F#", "G", "Ab", "G#", "A", "Bb", "A#", "B"].map((note) => (
                        <option key={note} value={note}>{note}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="scaleType">Scale Type: </label>
                <select id="scaleType" value={scaleType} onChange={handleScaleTypeChange}>
                    {ScaleType.names().map((name) => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </div>
            <button onClick={setScale}>Set Scale</button>
        </div>
    );
};

export default SetScale;
