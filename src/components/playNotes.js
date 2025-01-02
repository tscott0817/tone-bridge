import React from "react";
import * as Tone from 'tone';
import { useNoteContext } from "../stateManager/NoteContext";
import { FaCirclePlay } from "react-icons/fa6";

const PlayNotes = () => {
    const { selectedNotes, selectNote, unselectNote, setScaleDegrees, setChordDegrees } = useNoteContext();

    const handleNoteClick = (note, octave) => {
        const fullNote = note + octave;
        if (!selectedNotes.includes(fullNote)) {
            selectNote(fullNote);
        } else {
            unselectNote(fullNote);
        }
    };

    const handleClear = () => {
        selectedNotes.forEach((note) => unselectNote(note));

        // Clear scale and chord degrees
        setScaleDegrees({});
        setChordDegrees({});
    };

    const playNotesSynth = () => {
        const polySynth = new Tone.PolySynth().toDestination();

        const compressor = new Tone.Compressor(-30, 3).toDestination();
        const eq = new Tone.EQ3(-10, -10, -10).toDestination();

        polySynth.connect(compressor);
        compressor.connect(eq);

        const currTime = Tone.now();
        polySynth.triggerAttackRelease(selectedNotes, "1n", currTime);
    };

    return (
        <div style={{
            height: "100%",
            width: "100%",
            backgroundColor: "green",
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button onClick={playNotesSynth}>
                    {/*Play Current Notes*/}
                    <FaCirclePlay />
                </button>
                <button onClick={handleClear}>Clear All</button>
            </div>
        </div>
    );
};

export default PlayNotes;
