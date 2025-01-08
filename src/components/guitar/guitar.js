import React, { useState } from 'react';
import { Note } from "tonal";
import Neck from "./guitarComponents/neck";
import HeadStock from "./guitarComponents/headStock";
import FretNumbers from "./guitarComponents/fretNumbers";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import {
    buttonCompressed,
    noColor,
    fretNumberContainerColor,
    guitarBGColor,
    openNotesContainerColor
} from "../../stateManager/lightMode";
import { RiResetLeftLine } from "react-icons/ri";


const Guitar = ({openNotes, setOpenNotes, initialNotes}) => {
    // const initialNotes = [40, 45, 50, 55, 59, 64];
    // const [openNotes, setOpenNotes] = useState(initialNotes);
    const [showOctave, setShowOctave] = useState(false); // State for toggling octave display

    const noteNames = openNotes.map(note => {
        const noteName = Note.fromMidi(note);
        if (showOctave) {
            return noteName;  // Show the full note with the octave number
        } else {
            return noteName.replace(/[0-9]/g, '');  // Remove the octave number if showOctave is false
        }
    });

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
                flexDirection: 'row',  // Keep everything in a row
                justifyContent: 'center',
                backgroundColor: openNotesContainerColor,
                // backgroundColor: 'red',
                // marginBottom: '10px',
                height: '40px',
                marginBottom: '8px',
                textAlign: 'center',
                alignItems: 'center',  // Vertically align items
                flexWrap: 'wrap',  // Allow wrapping if necessary
                width: '100%',  // Ensure the container takes full width
            }}>
                {/* Note Buttons */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',  // Allow wrapping for notes
                    justifyContent: 'center',  // Keep note buttons centered
                    // backgroundColor: noColor,
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    borderRadius: '5px',
                }}>
                    {noteNames.map((name, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            // margin: '5px',  // Optional: adds spacing between note buttons
                        }}>
                            <button
                                onClick={() => decrementNote(index)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '5px',
                                    fontSize: '16px',
                                    border: 'none',
                                    backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                    cursor: 'pointer',
                                }}
                            >
                                <FaMinus/>
                            </button>
                            {name}
                            <button
                                onClick={() => incrementNote(index)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '5px',
                                    fontSize: '16px',
                                    border: 'none',
                                    backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                    cursor: 'pointer',
                                }}
                            >
                                <FaPlus/>
                            </button>
                        </div>
                    ))}
                </div>
                <div>
                    <button onClick={resetNotes} style={{
                        backgroundColor: noColor,
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        display: 'flex', // Use flexbox
                        justifyContent: 'center', // Center content horizontally
                        alignItems: 'center', // Center content vertically
                        width: '30px', // Optional: Set width for a square button
                        height: '30px', // Optional: Set height for a square button
                    }}>
                        <RiResetLeftLine style={{ fontSize: '25px' }} />
                    </button>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    position: 'fixed',
                    left: 10,
                    // marginLeft: '10px',
                }}>
                    <button onClick={toggleOctaves}
                            style={{
                                backgroundColor: showOctave ? buttonCompressed : noColor,
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                width: '35px',
                                height: '30px',
                                fontSize: '20px',
                            }}>
                        {showOctave ? '8' : '8'}<sup>va</sup>
                    </button>
                    {/*<button onClick={resetNotes} style={{*/}
                    {/*    marginLeft: '10px',*/}
                    {/*    // backgroundColor: showOctave ? buttonCompressed : noColor,*/}
                    {/*    backgroundColor: noColor,*/}
                    {/*    border: 'none',*/}
                    {/*    borderRadius: '5px',*/}
                    {/*    cursor: 'pointer',*/}
                    {/*    width: '110px',*/}
                    {/*    height: '30px',*/}
                    {/*    fontSize: '18px',*/}
                    {/*}}>*/}
                    {/*    Reset Open*/}
                    {/*</button>*/}
                </div>
            </div>


            {/* Guitar neck and headstock */}
            <div className="guitarContainer" style={{
                height: '100%',
                width: '100%',
                backgroundColor: guitarBGColor,
                //marginBottom: '10px',
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
                height: '10%',
                width: '100%',
                backgroundColor: fretNumberContainerColor,
                display: 'flex',
                flexDirection: 'row',
            }}>
                <FretNumbers/>
            </div>
        </div>
    );
};

export default Guitar;
