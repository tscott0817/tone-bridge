import React, {useState} from 'react';
import {useNoteContext} from "../stateManager/NoteContext";
import { Note } from "tonal";
import Neck from "./guitar/neck";
import HeadStock from "./guitar/headStock";
import FretNumbers from "./guitar/fretNumbers";

const Guitar = () => {
    const initialNotes = [40, 45, 50, 55, 59, 64];
    const [openNotes, setOpenNotes] = useState(initialNotes);

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

    return (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            // backgroundColor: 'pink',
        }}>
            {/* TODO: Might be better separate out from guitar */}
            <div className="noteNamesContainer" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'blue', marginBottom: '10px', height: '200px', textAlign: 'center'}}>
                {noteNames.map((name, index) => (
                    <div key={index} style={{margin: '5px', display: 'inline-block'}}>
                        <button onClick={() => decrementNote(index)}>-</button>
                        {name}
                        <button onClick={() => incrementNote(index)}>+</button>
                    </div>
                ))}
                <div style={{marginTop: '5px'}}>
                    <button onClick={resetNotes}>Reset</button>
                </div>
            </div>
            <div className="guitarContainer" style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'red',
                display: 'flex',
                flexDirection: 'row',
            }}>
                <div className="headstockContainer" style={{
                    height: '100%',
                    width: '5%',
                    // backgroundColor: 'brown',
                    display: 'flex',
                    zIndex: 2,
                }}>
                    <HeadStock openNotesProp={openNotes}/>
                </div>
                <div className="neckContainer" style={{
                    height: '100%',
                    width: '95%',
                    // backgroundColor: 'blue',
                    display: 'flex',
                    zIndex: 1,
                }}>
                    <Neck openNotesProp={openNotes}/>
                </div>
            </div>
            <div className="fretNumbersContainer" style={{
                height: '100%',
                width: '100%',
                //margin: '10%',
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
