import React, { useEffect, useState } from 'react';
import { useNoteContext } from "../../../stateManager/NoteContext";
import { getScalesAndChords, createScaleOrChord, deleteScaleOrChord } from '../../../backend/api';
import {useOpenNotesContext} from "../../../stateManager/OpenNotesContext";
import {Note} from "tonal";

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

    const addScale = async () => {
        if (!user) {
            alert('Please log in first!');
            return;
        }

        try {
            await createScaleOrChord(user.id, newScaleName, selectedType, newScaleNotes.split(','));

            const data = await getScalesAndChords(user.id, selectedType); // Fetch updated data
            setCurrentNotes(data);

            setNewScaleName('');
            setNewScaleNotes('');
        } catch (error) {
            console.error('Error creating data:', error.message);
        }
    };

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

    // const handleOpenNotes = (openNotes) => {
    //     openNotes.forEach(note => unselectOpenNote(note));
    //     // Convert note names to MIDI numbers before storing
    //     const midiNotes = openNotes.map(note => Note.midi(note));
    //     setPendingOpenNotes(midiNotes);
    //
    //     //setPendingOpenNotes(openNotes);
    // };

    useEffect(() => {
        if (pendingOpenNotes.length > 0) {
            pendingOpenNotes.forEach(note => selectOpenNote(note));
            setPendingOpenNotes([]);
        }
    }, [pendingOpenNotes, selectOpenNote]);

    return (
        <div>
            <h1>Scales, Chords, and Open Notes</h1>
            {user ? (
                <>
                    <div>
                        <input
                            type="text"
                            placeholder="Name for Selected Notes"
                            value={selectedScaleName}
                            onChange={(e) => setSelectedScaleName(e.target.value)}
                        />
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="scale"
                                    checked={selectedType === 'scale'}
                                    onChange={() => setSelectedType('scale')}
                                />
                                Scale
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="chord"
                                    checked={selectedType === 'chord'}
                                    onChange={() => setSelectedType('chord')}
                                />
                                Chord
                            </label>
                        </div>
                        <button onClick={addSelectedNotes}>Add Selected Notes</button>
                        <button onClick={addOpenNotes}>Save Open Notes</button>
                    </div>

                    {/* Display Scales */}
                    <h2>Scales</h2>
                    <div>
                        {scalesList.map((notes) => (
                            <div key={notes.id} style={{ marginBottom: '15px' }}>
                                <div style={{ marginBottom: '5px' }}>
                                    <strong>{notes.name}</strong>
                                </div>
                                <div style={{ marginBottom: '5px' }}>
                                    <span>{notes.data.join(', ')}</span>
                                </div>
                                <div>
                                    <button onClick={() => handleDeleteScale(notes.id)}>Delete</button>
                                    <button onClick={() => handleSelectScale(notes.data)}>Display Scale</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Display Chords */}
                    <h2>Chords</h2>
                    <div>
                        {chordsList.map((notes) => (
                            <div key={notes.id} style={{ marginBottom: '15px' }}>
                                <div style={{ marginBottom: '5px' }}>
                                    <strong>{notes.name}</strong>
                                </div>
                                <div style={{ marginBottom: '5px' }}>
                                    <span>{notes.data.join(', ')}</span>
                                </div>
                                <div>
                                    <button onClick={() => handleDeleteScale(notes.id)}>Delete</button>
                                    <button onClick={() => handleSelectScale(notes.data)}>Display Chord</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Display Open Notes */}
                    <h2>Open Notes</h2>
                    <div>
                        {openNotesList.map((notes) => (
                            <div key={notes.id} style={{ marginBottom: '15px' }}>
                                <div style={{ marginBottom: '5px' }}>
                                    <strong>{notes.name}</strong>
                                </div>
                                <div style={{ marginBottom: '5px' }}>
                                    <span>{notes.data.join(', ')}</span>
                                </div>
                                <div>
                                    <button onClick={() => handleDeleteScale(notes.id)}>Delete</button>
                                    <button onClick={() => handleOpenNotes(notes.data)}>Set Open Notes</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Please log in to view and create scales/chords/open notes.</p>
            )}
        </div>
    );
};

export default SaveData;
