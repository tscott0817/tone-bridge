// src/components/DisplayNotes.js
import React from 'react';
import { useNoteContext } from '../stateManager/NoteContext';

const DisplayNotes = () => {
    const { selectedNotes, rootNote } = useNoteContext();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'lightgray',
            height: '100%',
            width: "100%",
            overflow: 'auto',
            //marginBottom: '2%'
        }}>
            <h2>Selected Notes</h2>
            <ul>
                {selectedNotes.length > 0 ? selectedNotes.map((note, index) => (
                    <li key={index}>{note}</li>
                )) : <li>No notes selected</li>}
            </ul>
            <h2>Root Note</h2>
            <p>{rootNote || 'No root note set'}</p>

        </div>
        /*        <div style={{
                    backgroundColor: 'lightgray',
                    height: '100%',
                    margin: 0, // Remove any margins
                    padding: '10px', // Optional, adjust for internal spacing
                    //height: '100%',
                    //padding: '10px',
                    //marginTop: '10px',
                    //minWidth: '1000px'
                }}>
                    <h2>Selected Notes</h2>
                    {/!*<ul>*!/}
                    {/!*    {selectedNotes.length > 0 ? selectedNotes.map((note, index) => (*!/}
                    {/!*        <li key={index}>{note}</li>*!/}
                    {/!*    )) : <li>No notes selected</li>}*!/}
                    {/!*</ul>*!/}
                    {/!*<h2>Root Note</h2>*!/}
                    {/!*<p>{rootNote || 'No root note set'}</p>*!/}
                </div>*/
    );
};

export default DisplayNotes;
