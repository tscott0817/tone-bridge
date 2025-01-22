import React, { useEffect, useState } from 'react';
import { useNoteContext } from "../../../stateManager/NoteContext";
import { getScalesAndChords, createScaleOrChord, deleteScaleOrChord } from '../../../backend/api';
import {useOpenNotesContext} from "../../../stateManager/OpenNotesContext";
import {Note} from "tonal";
import RetrieveData from "./retrieveData";
import AddData from "./addData";

const SaveData = ({ user }) => {
    const {openNotes, setOpenNotes, selectOpenNote, unselectOpenNote} = useOpenNotesContext();
    const {selectedNotes, selectNote, unselectNote } = useNoteContext();
    const [currentNotes, setCurrentNotes] = useState([]);
    const [newScaleName, setNewScaleName] = useState('');
    const [newScaleNotes, setNewScaleNotes] = useState('');
    const [selectedType, setSelectedType] = useState('scale');
    const [selectedScaleName, setSelectedScaleName] = useState('');
    const [pendingNotes, setPendingNotes] = useState([]); // To enforce clearing and adding notes in sequence
    const [pendingOpenNotes, setPendingOpenNotes] = useState([]);
    const scalesList = currentNotes.filter(notes => notes.type === 'scale');
    const chordsList = currentNotes.filter(notes => notes.type === 'chord');
    const openNotesList = currentNotes.filter(notes => notes.type === 'open_notes');
    const [activeSection, setActiveSection] = useState('addData');
    const [showAddData, setShowAddData] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const data = await getScalesAndChords(user.id, selectedType);
                    setCurrentNotes(data);
                } catch (error) {
                    console.error('Error fetching data:', error.message);
                }
            };

            fetchData();
        }
    }, [user, selectedType]);

    const addSelectedNotes = async () => {
        if (!user) {
            alert('Please log in first!');
            return;
        }

        if (!selectedScaleName) {
            alert('Please provide a name for the scale or chord.');
            return;
        }

        try {
            await createScaleOrChord(user.id, selectedScaleName, selectedType, selectedNotes);

            const data = await getScalesAndChords(user.id, selectedType); // Fetch updated data
            setCurrentNotes(data);

            setSelectedScaleName('');
        } catch (error) {
            console.error('Error creating data:', error.message);
        }
    };

    const handleDeleteScale = async (scaleId) => {
        try {
            await deleteScaleOrChord(scaleId);
            setCurrentNotes((prev) => prev.filter(notes => notes.id !== scaleId)); // Remove the deleted item from the state
        } catch (error) {
            console.error('Error deleting data:', error.message);
        }
    };

    const addOpenNotes = async () => {
        if (!user) {
            alert('Please log in first!');
            return;
        }

        if (!selectedScaleName) {
            alert('Please provide a name for the scale or chord.');
            return;
        }

        try {
            // Convert MIDI note numbers in openNotes to note names using Tonal.js
            const noteNames = openNotes.map((midiNote) => Note.fromMidi(midiNote));

            // Create a new scale, chord, or open_note using the note names
            await createScaleOrChord(user.id, selectedScaleName, 'open_notes', noteNames);

            // Re-fetch data after adding a new one
            const data = await getScalesAndChords(user.id, 'open_notes'); // Fetch updated data
            setCurrentNotes(data);

            // Clear the input fields
            setSelectedScaleName('');
        } catch (error) {
            console.error('Error creating data:', error.message);
        }
    };

    const handleSelectScale = (scaleNotes) => {
        console.log("scaleNotes: " + scaleNotes)
        // Clear existing selected notes before adding new ones
        selectedNotes.forEach(note => unselectNote(note)); // Unselect all existing notes

        // Store new notes for selection
        setPendingNotes(scaleNotes);
    };

    useEffect(() => {
        if (pendingNotes.length > 0) {
            pendingNotes.forEach(note => selectNote(note));
            setPendingNotes([]);
        }
        // console.log(selectedNotes);
    }, [pendingNotes, selectNote]);


    const handleOpenNotes = (openNotes) => {
        openNotes.forEach(note => unselectOpenNote(note));
        const midiNotes = openNotes.map(note => Note.midi(note));
        setOpenNotes(midiNotes); // Replace openNotes with the new midiNotes
    };

    useEffect(() => {
        if (pendingOpenNotes.length > 0) {
            pendingOpenNotes.forEach(note => selectOpenNote(note));
            setPendingOpenNotes([]);
        }
    }, [pendingOpenNotes, selectOpenNote]);

    return (
        <div style={{
            //marginTop: '24px',
            width: '90%',
            marginLeft: '5%',
            height: '95%',
            //backgroundColor: 'purple'
        }}>
            {user ? (
                <>
                    {/* Toggle Buttons */}
                    <div style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        display: 'flex',
                        gap: '10px', // Space between buttons
                        justifyContent: 'center', // Center the buttons
                    }}>
                        <button
                            onClick={() => setActiveSection('addData')}
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                backgroundColor: activeSection === 'addData' ? '#007BFF' : '#cccccc', // Blue if selected, gray if not
                                color: activeSection === 'addData' ? '#fff' : '#333', // White text if selected, dark text if not
                                borderRadius: '5px',
                                cursor: 'pointer',
                                flex: 1, // Make buttons take equal width
                                fontSize: '16px',
                                fontWeight: '500',
                                transition: 'background-color 0.3s ease, transform 0.2s ease',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                outline: 'none',
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Add New Data
                        </button>
                        <button
                            onClick={() => setActiveSection('retrieveData')}
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                backgroundColor: activeSection === 'retrieveData' ? '#007BFF' : '#cccccc', // Blue if selected, gray if not
                                color: activeSection === 'retrieveData' ? '#fff' : '#333', // White text if selected, dark text if not
                                borderRadius: '5px',
                                cursor: 'pointer',
                                flex: 1, // Make buttons take equal width
                                fontSize: '16px',
                                fontWeight: '500',
                                transition: 'background-color 0.3s ease, transform 0.2s ease',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                outline: 'none',
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            View Saved Data
                        </button>
                    </div>

                    {/* Conditional Rendering based on activeSection */}
                    {activeSection === 'addData' ? (
                        <AddData
                            selectedScaleName={selectedScaleName}
                            setSelectedScaleName={setSelectedScaleName}
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                            addSelectedNotes={addSelectedNotes}
                            addOpenNotes={addOpenNotes}
                        />
                    ) : (
                        <RetrieveData
                            scalesList={scalesList}
                            chordsList={chordsList}
                            openNotesList={openNotesList}
                            handleDeleteScale={handleDeleteScale}
                            handleSelectScale={handleSelectScale}
                            handleOpenNotes={handleOpenNotes}
                        />
                    )}
                </>
            ) : (
                <p>Please log in to view and create scales/chords/open notes.</p>
            )}
        </div>
    );
};

export default SaveData;
