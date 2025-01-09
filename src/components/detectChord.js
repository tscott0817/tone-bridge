import React, { useEffect, useState } from "react";
import { Chord } from "tonal";
import { useNoteContext } from "../stateManager/NoteContext";
import {useThemeContext} from "../stateManager/ThemeContext";
import * as lightColors from "../stateManager/lightMode";
import * as darkColors from "../stateManager/darkMode"; // Import the NoteContext

const DetectChord = () => {
    const { selectedNotes } = useNoteContext(); // Use the NoteContext
    const [chordNames, setChordNames] = useState([]);
    const { theme, toggleTheme } = useThemeContext();

    const detectChord = () => {
        const chords = Chord.detect(selectedNotes);
        setChordNames(chords);
    };

    useEffect(() => {
        detectChord(); // Detect chords when the component mounts or selectedNotes change
    }, [selectedNotes]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme === lightColors ? lightColors.detectedChordsBGColor : darkColors.detectedChordsBGColor,
            height: '100%',
            width: "100%",
            overflow: 'auto',
            //marginBottom: '2%'
        }}>
            <h3>Detected Chords</h3>
            <div>
                Chords: {chordNames.length > 0 ? chordNames.join(' | ') : 'No chord detected'}
            </div>
        </div>
    );
};

export default DetectChord;
