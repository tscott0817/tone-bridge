import React, { useEffect, useState } from "react";
import { Chord } from "tonal";
import { useNoteContext } from "../stateManager/NoteContext";
import {useThemeContext} from "../stateManager/ThemeContext";
import * as lightColors from "../stateManager/lightMode";
import * as darkColors from "../stateManager/darkMode"; // Import the NoteContext


// TODO: Need to consider octave numbers to correctly determine inversions
//      - Right now it just assumes the first note in list is the bass, need it to produce all chords for all
//          * combinations of notes.
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
            //backgroundColor: theme === lightColors ? lightColors.detectedChordsBGColor : darkColors.detectedChordsBGColor,
            height: '100%',
            width: "100%",
            overflow: 'auto',
            //marginBottom: '2%'
            //backgroundColor: 'blue',
        }}>
            <h3 style={{margin: '10px 0'}}>Detected Chords</h3>
            <div style={{
                //backgroundColor: 'red',
            }}>
                {chordNames.length > 0 ? chordNames.join(' | ') : 'No chord detected'}
            </div>
        </div>
    );
};

export default DetectChord;
