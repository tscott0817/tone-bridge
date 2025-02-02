import React, { useEffect, useState } from "react";
import { useNoteContext } from "../../../stateManager/NoteContext"; // Import the NoteContext
import { Scale, ScaleType } from 'tonal';

const SetScale = () => {
    const { selectedNotes, selectNote, unselectNote, setScaleDegrees } = useNoteContext();
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
            minHeight: '150px',
            width: "100%",
            // padding: '10px',
            overflow: 'auto',
            display: 'flex',
            borderRadius: '10px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '10px',
            marginTop: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}>
            <div style={{ width: '90%', marginLeft: '5%',  }}>
                <label htmlFor="keyNote">Tonic: </label>
                <select id="keyNote" value={keyNote} onChange={handleKeyNoteChange} style={{ width: '100%' }}>
                    {["C", "Db", "C#", "D", "Eb", "D#", "E", "F", "Gb", "F#", "G", "Ab", "G#", "A", "Bb", "A#", "B"].map((note) => (
                        <option key={note} value={note}>{note}</option>
                    ))}
                </select>
            </div>
            <div style={{width: '90%', marginLeft: '5%',}}>
                <label htmlFor="scaleType">Scale Type: </label>
                <select id="scaleType" value={scaleType} onChange={handleScaleTypeChange} style={{width: '100%'}}>
                    {ScaleType.names().map((name) => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </div>
            <button onClick={setScale} style={{alignSelf: 'center' }}>Set Scale</button> {/* Left align the button */}
        </div>
    );
};

export default SetScale;
