import React from "react";
import * as Tone from 'tone';
import { useNoteContext } from "../stateManager/NoteContext";
import { FaCirclePlay } from "react-icons/fa6";
import * as lightColors from "../stateManager/lightMode";
import * as darkColors from "../stateManager/darkMode";
import {useThemeContext} from "../stateManager/ThemeContext";
import {noColor} from "../stateManager/darkMode";
import {buttonCompressed} from "../stateManager/lightMode";

const PlayNotes = () => {
    const { selectedNotes, selectNote, unselectNote, setScaleDegrees, setChordDegrees } = useNoteContext();
    const { theme, toggleTheme } = useThemeContext();


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
            backgroundColor: theme === lightColors ? lightColors.playButtonContainerColor : darkColors.playButtonContainerColor,
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <button
                    onClick={playNotesSynth}
                    style={{
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: noColor,
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <FaCirclePlay style={{
                        width: '100%',
                        height: '100%'
                    }}/>
                </button>
                <button
                    onClick={handleClear}
                    onMouseDown={(e) => (e.target.style.backgroundColor = buttonCompressed)} // Temporary color on click
                    // onMouseUp={(e) => (e.target.style.backgroundColor = '#dbdbdb')} // Revert to original color
                    // onMouseLeave={(e) => (e.target.style.backgroundColor = '##dbdbdb')} // Revert if mouse leaves
                    onMouseUp={(e) => (e.target.style.backgroundColor = noColor)} // Revert to original color
                    onMouseLeave={(e) => (e.target.style.backgroundColor = noColor)} // Revert if mouse leaves
                    style={{
                        // backgroundColor: '#dbdbdb',
                        backgroundColor: noColor,
                        border: 'none',
                        borderRadius: '10%',
                        margin: '5px',
                        padding: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease', // Smooth transition
                    }}
                >
                    Clear Notes
                </button>
            </div>
        </div>
    );
};

export default PlayNotes;
