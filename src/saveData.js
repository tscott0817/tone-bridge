import React, { useEffect, useState } from 'react';
import { getScalesAndChords, createScaleOrChord, deleteScaleOrChord } from './backend/api'; // Import scale/chord functions

const SaveData = ({ user }) => {
    const [scales, setScales] = useState([]);
    const [newScaleName, setNewScaleName] = useState('');
    const [newScaleNotes, setNewScaleNotes] = useState('');
    const [selectedType, setSelectedType] = useState('scale'); // State to hold the selected type (scale, chord, open_notes)

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

    // Add a new scale, chord, or open_note to the user's profile
    const addScale = async () => {
        if (!user) {
            alert('Please log in first!');
            return;
        }

        try {
            // Create a new scale, chord, or open_note in Supabase
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
                        <button onClick={addScale}>Add</button>
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
