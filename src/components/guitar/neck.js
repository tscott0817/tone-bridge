import React, {useEffect} from 'react';
import { useNoteContext } from "../../stateManager/NoteContext";
import { Note } from "tonal";
import woodImage from '../../img/wood.png';

const Neck = () => {
    const { selectedNotes, selectNote, unselectNote } = useNoteContext();
    const backgroundImageUrl = 'C:/Users/tyler/Dev/harmony-helper-js/src/img/wood.png';
    const numFrets = 12;

    // TODO: Too much nesting here, simplify
    const openLowE = 40;
    const openA = 45;
    const openD = 50;
    const openG = 55;
    const openB = 59;
    const openHighE = 64;

    // Make above an array of midiNotes instead
    const openNotes = [openLowE, openA, openD, openG, openB, openHighE];

    const stringNotes = [
        Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[5] + i))),  // E4 to E5
        Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[4] + i))), // B3 to B4
        Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[3] + i))), // G3 to G4
        Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[2] + i))), // D3 to D4
        Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[1] + i))), // A2 to A3
        Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openNotes[0] + i))), // E2 to E3
    ];

    // const stringNotes = [
    //     Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openHighE + i))),  // E4 to E5
    //     Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openB + i))), // B3 to B4
    //     Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openG + i))), // G3 to G4
    //     Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openD + i))), // D3 to D4
    //     Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openA + i))), // A2 to A3
    //     Array.from({ length: 13 }, (_, i) => Note.name(Note.fromMidi(openLowE + i))), // E2 to E3
    // ];

    // Frets 0 - 12, strings 1 -> High E, 6 -> Low E
    // TODO: Add support for different tunings, different number of strings,
    const calculateNote = (fret, string) => {
        const noteIndex = (fret) % stringNotes[string - 1].length;
        const noteName = stringNotes[string - 1][noteIndex];

        return `${noteName}`;
    };

    // Function to handle fret click
    const handleFretClick = (note) => {
        if (selectedNotes.includes(note)) {
            unselectNote(note);
        } else {
            selectNote(note);
        }
    };

    useEffect(() => {
        // This is just to the guitar updates every time a new note is added outside of the guitar component
    }, [selectedNotes]);

    return (
            <div className="neck" style={{
                // backgroundImage: `url("${woodImage}")`,
                // backgroundSize: 'cover', // Scale the background image to cover the entire container
                // backgroundPosition: 'center', // Center the background image
                backgroundColor: '#a36233',
                position: 'relative',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                // margin: '10px'
            }}>

                {/* Render frets */}
                <div className="frets" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    {[...Array(numFrets + 1)].map((_, fretIndex) => (
                        <div
                            key={fretIndex}
                            className="fret"
                            style={{
                                width: '10px',
                                backgroundColor: 'black',
                            }}
                        ></div>
                    ))}
                </div>
                {[1, 2, 3, 4, 5, 6].map((stringIndex) => (
                    <div key={stringIndex}>
                        {/* Render notes */}
                        {Array.from({length: numFrets}, (_, i) => i).map((fret, index) => {
                            const note = calculateNote(fret, stringIndex);
                            const leftPosition = `${(fret + 0.5) * (100 / numFrets)}%`;
                            const noteHeight = (stringIndex - 1) * (100 / 6) + 15 / 2;

                            // Adjusted left position for the first fret
                            const left = index === 0 ? `calc(${leftPosition} - 22.5px)` : `calc(${leftPosition} - 22.5px)`;
                            const noteStyle = {
                                position: 'absolute',
                                left: left,
                                transform: 'translateY(-50%)',
                                top: `${noteHeight}%`,
                                width: '45px',
                                height: '45px',
                                border: '1px solid black',
                                borderRadius: '50%',
                                backgroundColor: selectedNotes.includes(note) ? 'teal' : 'rgba(168, 193, 221, 0.8)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 2,
                            };
                            return (
                                <div
                                    key={fret}
                                    className="notes"
                                    style={noteStyle}
                                    onClick={() => handleFretClick(note)}
                                >
                                    {selectedNotes.includes(note) && (
                                        <div
                                            className="note-circle"
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                backgroundColor: 'transparent',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center', // Center the text vertically
                                            }}
                                        >
                                            {selectedNotes.includes(note) && note}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        <div
                            className="string-horizontal"
                            style={{
                                backgroundColor: ` #ffffff`,
                                marginTop: '22.5px', // Spacing between strings
                                height: '5px', // Fixed height for the string
                                width: '105.3%', // Full width
                                position: 'absolute',
                                right: 0,
                                top: `${(stringIndex - 1) * (100 / 6)}%`, // Calculate the top position based on string index
                                zIndex: 1
                            }}
                        ></div>
                    </div>
                ))}
            </div>
    );
};

export default Neck;