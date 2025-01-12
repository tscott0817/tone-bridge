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
import {useOpenNotesContext} from "../../stateManager/OpenNotesContext";
import * as lightColors from "../../stateManager/lightMode";
import * as darkColors from "../../stateManager/darkMode";
import {useThemeContext} from "../../stateManager/ThemeContext";
import tuning from '../../img/tuning.png';
import tuningFork from '../../img/tuning-fork.png';


const Guitar = () => {
    const {openNotes, incrementNote, decrementNote, resetOpenNotes} = useOpenNotesContext();
    const [showOctave, setShowOctave] = useState(false); // State for toggling octave display
    const { theme, toggleTheme } = useThemeContext();
    console.log('open notes: ' + openNotes);

    const noteNames = openNotes.map(note => {
        // console.log('open notes' + openNotes);
        const noteName = Note.fromMidi(note);
        if (showOctave) {
            return noteName;  // Show the full note with the octave number
        } else {
            return noteName.replace(/[0-9]/g, '');  // Remove the octave number if showOctave is false
        }
    }, [openNotes]);

    const toggleOctaves = () => {
        setShowOctave(!showOctave); // Toggle the showOctave state
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            position: 'relative', // Set the parent div to relative positioning
        }}>
            {/* Note selection and toggle */}
            <div className="noteNamesContainer" style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                height: '40px',
                marginBottom: '8px',
                textAlign: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                width: '100%',
            }}>
                <img src={tuningFork} alt="My Icon" style={{
                    width: '30px',
                    height: '30px',
                    //backgroundColor: 'red',
                    marginRight: '5px',
                    //marginLeft: '50px'
                }}/>
                {/* Note Buttons */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    backgroundColor: theme === lightColors ? lightColors.openNotesContainerColor : darkColors.openNotesContainerColor,
                    borderRadius: '5px',
                }}>
                    {noteNames.map((name, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <button
                                onClick={() => decrementNote(index)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '5px',
                                    border: 'none',
                                    backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                    cursor: 'pointer',
                                }}
                            >
                                <FaMinus style={{fontSize: '10px'}}/>
                            </button>
                            <span style={{fontSize: '20px'}}>
                        {name}
                    </span>
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
                                <FaPlus style={{fontSize: '10px'}}/>
                            </button>
                        </div>
                    ))}
                </div>
                <div>
                    <button onClick={resetOpenNotes} style={{
                        backgroundColor: noColor,
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '30px',
                        height: '30px',
                    }}>
                        <RiResetLeftLine style={{fontSize: '25px'}}/>
                    </button>
                </div>
            </div>

            {/* 8va button positioned at top-left of the container */}
            <div style={{
                position: 'absolute',  // Set absolute positioning
                //top: '10px',  // Adjust top position
                left: '10px',  // Adjust left position
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
            </div>

            {/* Guitar neck and headstock */}
            <div className="guitarContainer" style={{
                height: '100%',
                width: '100%',
                backgroundColor: guitarBGColor,
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
