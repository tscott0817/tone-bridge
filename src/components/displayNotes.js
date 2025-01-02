// src/components/displayNotes.js
import React from 'react';
import { useNoteContext } from '../stateManager/NoteContext';

const DisplayNotes = () => {
    const { selectedNotes, rootNote } = useNoteContext();

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
            backgroundColor: 'lightgray',
            height: '100%',
            width: "100%",
            overflow: 'auto',
            alignItems: 'center',    // Center content horizontally
            justifyContent: 'center',// Center content vertically
            textAlign: 'center',     // Center text inside the list items
        }}>
            <h2>Selected Notes</h2>
            <ul style={{
                display: 'flex',        // Use flexbox to display the list items in a row
                flexDirection: 'row',   // Make the flex direction horizontal (row)
                padding: 0,             // Remove default padding
                listStyleType: 'none',  // Remove default list styling
                justifyContent: 'center', // Center the list items horizontally
            }}>
                {cleanedNotes.length > 0 ? cleanedNotes.map((note, index) => (
                    <li key={index} style={{
                        marginRight: index < cleanedNotes.length - 1 ? '5px' : '0',  // Add margin only if it's not the last note
                    }}>
                        {note}
                        {index < cleanedNotes.length - 1 && <span> - </span>} {/* Add hyphen between notes, except the last one */}
                    </li>
                )) : <li>No notes selected</li>}
            </ul>
        </div>
    );
};

export default DisplayNotes;
