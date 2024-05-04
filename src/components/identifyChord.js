import React, { useState, useContext, createContext } from "react";
import { Chord, ChordType, Note } from "tonal";
import * as Tone from 'tone';
import { useNoteContext } from "../stateManager/NoteContext"; // Import the NoteContext

const IdentifyChord = () => {
    const { selectedNotes, selectNote, unselectNote } = useNoteContext(); // Use the NoteContext

    const handleNoteClick = (note, octave) => {
        const fullNote = note + octave;
        if (!selectedNotes.includes(fullNote)) {
            selectNote(fullNote); // Call selectNote from the context
        } else {
            unselectNote(fullNote); // Call unselectNote from the context
        }
    };

    const handleClear = () => {
        selectedNotes.forEach((note) => unselectNote(note));
    };

    const playChord = () => {
        // Create a polyphonic synthesizer
        const polySynth = new Tone.PolySynth().toDestination();

        // Apply audio effects
        const compressor = new Tone.Compressor(-30, 3).toDestination(); // Apply compression
        const eq = new Tone.EQ3(-10, -10, -10).toDestination(); // Apply equalization

        // Connect the synthesizer to the effects chain
        polySynth.connect(compressor);
        compressor.connect(eq);

        // Trigger the attack and release of the selected notes
        const currTime = Tone.now();
        polySynth.triggerAttackRelease(selectedNotes, "1n", currTime);
    };

    return (
        <div style={{height: "100%", width: "100%", backgroundColor: "green", overflow: 'auto'}}>
            <div>
                {["C", "Db", "C#", "D", "Eb", "D#", "E", "F", "Gb", "F#", "G", "Ab", "G#", "A", "Bb", "A#", "B"].map((note) => (
                    <div key={note}>
                        <span>{note}</span>
                        {[1, 2, 3, 4, 5, 6, 7].map((octave) => (
                            <button
                                key={note + octave}
                                onClick={() => handleNoteClick(note, octave)}
                                style={{margin: "5px"}}
                                className={selectedNotes.includes(note + octave) ? "selected" : ""}
                            >
                                {note}{octave}
                            </button>
                        ))}
                    </div>
                ))}
                <button onClick={playChord}>
                    Play Current Chord
                </button>
                <button onClick={handleClear}>Clear All</button>
            </div>
            <div>
                <p>Selected Notes: {selectedNotes.join(", ")}</p>
                <p>Detected Chords:</p>
                {Chord.detect(selectedNotes).map((chord, index) => (
                    <p key={index}>{chord}</p>
                ))}
            </div>
            <div>
                <p>Global Notes: {selectedNotes.join(", ")}</p>
            </div>
        </div>
    );
};

export default IdentifyChord;
