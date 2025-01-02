import React, { useState } from 'react';
import { Note } from "tonal";
import Neck from "./guitarComponents/neck";
import HeadStock from "./guitarComponents/headStock";
import FretNumbers from "./guitarComponents/fretNumbers";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const Guitar = () => {
    const initialNotes = [40, 45, 50, 55, 59, 64];
    const [openNotes, setOpenNotes] = useState(initialNotes);
    const [showOctave, setShowOctave] = useState(false); // State for toggling octave display

    // Convert MIDI numbers to note names
    const noteNames = openNotes.map(note => Note.fromMidi(note));

    const incrementNote = (index) => {
        setOpenNotes(openNotes.map((note, i) => i === index ? note + 1 : note));
    };

    const decrementNote = (index) => {
        setOpenNotes(openNotes.map((note, i) => i === index ? note - 1 : note));
    };

    const resetNotes = () => {
        setOpenNotes(initialNotes);
    };

    const toggleOctaves = () => {
        setShowOctave(!showOctave); // Toggle the showOctave state
    };

    return (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Note selection and toggle */}
            <div className="noteNamesContainer" style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: 'pink',
                marginBottom: '10px',
                height: '200px',
                textAlign: 'center'
            }}>
                {noteNames.map((name, index) => (
                    <div key={index} style={{margin: '5px', display: 'inline-block'}}>
                        <button onClick={() => decrementNote(index)}><FaMinus /></button>
                        {name}
                        <button onClick={() => incrementNote(index)}><FaPlus /></button>
                    </div>
                ))}
                <div style={{marginTop: '5px'}}>
                    <button onClick={resetNotes}>Reset</button>
                </div>
                {/* Toggle for octave numbers */}
                <div style={{marginTop: '5px'}}>
                    <button onClick={toggleOctaves}>
                        {showOctave ? 'Hide Octave Numbers' : 'Show Octave Numbers'}
                    </button>
                </div>
            </div>

            {/* Guitar neck and headstock */}
            <div className="guitarContainer" style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'red',
                marginBottom: '10px',
                display: 'flex',
                flexDirection: 'row',
            }}>
                <div className="headstockContainer" style={{
                    height: '100%',
                    width: '5%',
                    display: 'flex',
                    zIndex: 2,
                }}>
                    <HeadStock openNotesProp={openNotes} showOctave={showOctave}/>
                </div>
                <div className="neckContainer" style={{
                    height: '100%',
                    width: '95%',
                    display: 'flex',
                    zIndex: 1,
                }}>
                    {/* Pass showOctave state to Neck component */}
                    <Neck openNotesProp={openNotes} showOctave={showOctave}/>
                </div>
            </div>

            {/* Fret numbers */}
            <div className="fretNumbersContainer" style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'orange',
                display: 'flex',
                flexDirection: 'row',
            }}>
                <FretNumbers/>
            </div>
        </div>
    );
};

export default Guitar;
