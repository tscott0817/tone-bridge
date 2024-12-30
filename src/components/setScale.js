import React, {useEffect, useState} from "react";
import {useNoteContext} from "../stateManager/NoteContext"; // Import the NoteContext
import {Scale, ScaleType} from 'tonal';

const SetScale = () => {
    const { selectedNotes, selectNote, unselectNote, setScaleDegrees, clearSelectedNotes } = useNoteContext();
    const [keyNote, setKeyNote] = useState("C");
    const [scaleType, setScaleType] = useState("major");
    const [pendingNotes, setPendingNotes] = useState([]); // To enforce clearing and adding notes in sequence

    const handleKeyNoteChange = (event) => {
        setKeyNote(event.target.value);
    };

    const handleScaleTypeChange = (event) => {
        setScaleType(event.target.value);
    };

    const setScale = () => {
        const scaleNotes = Scale.get(`${keyNote} ${scaleType}`).notes;
        console.log('Scale Notes', scaleNotes);

        const scaleDegrees = scaleNotes.reduce((acc, note, index) => {
            const degreeNames = [
                'root',
                'second',
                'third',
                'fourth',
                'fifth',
                'sixth',
                'seventh',
                'eighth',
                'ninth',
                'tenth',
                'eleventh',
                'twelfth'
            ];

            acc[degreeNames[index % degreeNames.length]] = note;
            return acc;
        }, {});

        setScaleDegrees(scaleDegrees);

        const octaveNotes = scaleNotes.reduce((noteArray, note) => {
            for (let octave = 1; octave <= 7; octave++) {
                noteArray.push(`${note}${octave}`);
            }
            return noteArray;
        }, []);

        // Store new notes for addition in useEffect
        setPendingNotes(octaveNotes);
    };

    useEffect(() => {
        if (pendingNotes.length > 0) {
            //clearSelectedNotes();
            pendingNotes.forEach(note => selectNote(note));
            setPendingNotes([]); // Reset pending notes
        }
    }, [pendingNotes, selectNote]);

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
