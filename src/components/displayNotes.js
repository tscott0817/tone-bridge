// src/components/displayNotes.js
import React from 'react';
import { useNoteContext } from '../stateManager/NoteContext';
import * as lightColors from "../stateManager/lightMode";
import * as darkColors from "../stateManager/darkMode";
import {useThemeContext} from "../stateManager/ThemeContext";

const DisplayNotes = () => {
    const { selectedNotes, rootNote } = useNoteContext();
    const { theme, toggleTheme } = useThemeContext();

    // Function to clean notes and remove duplicates
    const cleanNotes = (notes) => {
        const uniqueNotes = [];

        notes.forEach(note => {
            // Remove digits manually (octave numbers)
            const cleanedNote = note.split('').filter(char => isNaN(char)).join('');

            // Add the cleaned note to the array if it's not already in it
            if (!uniqueNotes.includes(cleanedNote)) {
                uniqueNotes.push(cleanedNote);
            }
        });

        return uniqueNotes;
    };

    const cleanedNotes = cleanNotes(selectedNotes);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            //backgroundColor: theme === lightColors ? lightColors.selectedNotesBGColor : darkColors.selectedNotesBGColor,
            height: '100%',
            width: "100%",
            overflow: 'auto',
            //alignItems: 'center',    // Center content horizontally
            //justifyContent: 'center',// Center content vertically
            //textAlign: 'center',     // Center text inside the list items
            //backgroundColor: 'green',
        }}>
            <h3 style={{margin: '10px 0'}}>Selected Notes</h3>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                //backgroundColor: 'red',
                justifyContent: 'center'
            }}>
                {cleanedNotes.length > 0 ? cleanedNotes.map((note, index) => (
                    <li key={index} style={{
                        marginRight: index < cleanedNotes.length - 1 ? '5px' : '0',  // Add margin only if it's not the last note
                        listStyleType: 'none',
                    }}>
                        {note}
                        {index < cleanedNotes.length - 1 && <span> - </span>} {/* Add hyphen between notes, except the last one */}
                    </li>
                )) : <li style={{
                    listStyleType: 'none',
                }}>No notes selected</li>}
            </div>
        </div>
    );
};

export default DisplayNotes;
