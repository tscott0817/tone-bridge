import React, { useEffect, useState } from 'react';
import { useNoteContext } from "./stateManager/NoteContext"; // Import the context to get selectedNotes
import { getScalesAndChords, createScaleOrChord, deleteScaleOrChord } from './backend/api';
import {Note} from "tonal"; // Import scale/chord functions

const SaveData = ({ user, openNotes }) => {
    const { selectedNotes } = useNoteContext(); // Access selectedNotes from the context
    const [scales, setScales] = useState([]);
    const [newScaleName, setNewScaleName] = useState('');
    const [newScaleNotes, setNewScaleNotes] = useState('');
    const [selectedType, setSelectedType] = useState('scale'); // State to hold the selected type (scale, chord, open_notes)
    const [selectedScaleName, setSelectedScaleName] = useState(''); // State to hold the name for the selected notes scale/chord

    // Fetch scales, chords, or open_notes for the logged-in user
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const data = await getScalesAndChords(user.id, selectedType); // Fetch data based on the selected type
                    setScales(data);
                } catch (error) {
                    console.error('Error fetching data:', error.message);
                }
            };

            fetchData();
        }
    }, [user, selectedType]); // Fetch when user or selectedType changes

    // Add openNotes to the database
    const addOpenNotes = async () => {
        if (!user) {
            alert('Please log in first!');
            return;
        }

        try {
            // Convert MIDI numbers to letter names using tonal.js
            const noteNames = openNotes.map(note => Note.fromMidi(note).replace(/[0-9]/g, ''));

            // Create a new open_notes entry in the database with note names
            await createScaleOrChord(user.id, 'Open Notes', 'open_notes', noteNames);

            // Re-fetch data after adding
            const data = await getScalesAndChords(user.id, 'open_notes'); // Fetch updated data
            setScales(data);
        } catch (error) {
            console.error('Error creating open notes:', error.message);
        }
    };


    // Add a new scale, chord, or open_note to the user's profile
    const addScale = async () => {
        if (!user) {
            alert('Please log in first!');
            return;
        }

        try {
            // Create a new scale, chord, or open_note in Supabase with the manual notes
            await createScaleOrChord(user.id, newScaleName, selectedType, newScaleNotes.split(','));

            // Re-fetch data after adding a new one
            const data = await getScalesAndChords(user.id, selectedType); // Fetch updated data
            setScales(data);

            // Clear the input fields
            setNewScaleName('');
            setNewScaleNotes('');
        } catch (error) {
            console.error('Error creating data:', error.message);
        }
    };

    // Add the selected notes from the context to the database with the name and type
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
            // Create a new scale, chord, or open_note using selectedNotes
            await createScaleOrChord(user.id, selectedScaleName, selectedType, selectedNotes);

            // Re-fetch data after adding a new one
            const data = await getScalesAndChords(user.id, selectedType); // Fetch updated data
            setScales(data);

            // Clear the input fields
            setSelectedScaleName('');
        } catch (error) {
            console.error('Error creating data:', error.message);
        }
    };

    // Delete a scale, chord, or open_note from the user's profile
    const handleDeleteScale = async (scaleId) => {
        try {
            await deleteScaleOrChord(scaleId);
            setScales((prev) => prev.filter(scale => scale.id !== scaleId)); // Remove the deleted item from the state
        } catch (error) {
            console.error('Error deleting data:', error.message);
        }
    };

    return (
        <div>
            <h1>Scales, Chords, and Open Notes</h1>
            {user ? (
                <>
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newScaleName}
                            onChange={(e) => setNewScaleName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Notes (comma separated)"
                            value={newScaleNotes}
                            onChange={(e) => setNewScaleNotes(e.target.value)}
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
                            <label>
                                <input
                                    type="radio"
                                    value="open_notes"
                                    checked={selectedType === 'open_notes'}
                                    onChange={() => setSelectedType('open_notes')}
                                />
                                Open Notes
                            </label>
                        </div>
                        <button onClick={addScale}>Add Manual Notes</button>
                    </div>

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
                    </div>

                    <div>
                        <button onClick={addOpenNotes}>Save Open Notes</button>
                    </div>

                    <ul>
                        {scales.map((scale) => (
                            <li key={scale.id}>
                                <strong>{scale.name}</strong>: {scale.data.join(', ')}
                                <button onClick={() => handleDeleteScale(scale.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Please log in to view and create scales/chords/open notes.</p>
            )}
        </div>
    );
};
export default SaveData;
