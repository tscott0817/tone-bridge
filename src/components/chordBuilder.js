import React, {useState} from "react";
import * as Tone from 'tone';
import { useNoteContext } from "../stateManager/NoteContext";
import {Chord} from "tonal"; // Import the NoteContext

const ChoredBuilder = () => {

    const { selectedNotes, selectNote, unselectNote, setRootNote } = useNoteContext(); // Use the NoteContext
    const [root, setRoot] = useState("C");

    const handleRootChange = (event) => {
        setRoot(event.target.value);
    };


    return (
        <div style={{backgroundColor: 'pink'}}>
            <h1>Chord Builder</h1>
            <div>
                <label htmlFor="root">Root: </label>
                <select id="root" value={root} onChange={handleRootChange}>
                    {["C", "Db", "C#", "D", "Eb", "D#", "E", "F", "Gb", "F#", "G", "Ab", "G#", "A", "Bb", "A#", "B"].map((note) => (
                        <option key={note} value={note}>{note}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ChoredBuilder;