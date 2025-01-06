import React, { useEffect, useState } from 'react';
import { getScalesAndChords, createScaleOrChord, deleteScaleOrChord } from './backend/api'; // Import scale/chord functions

const ScaleList = ({ user }) => {
    const [scales, setScales] = useState([]);
    const [newScaleName, setNewScaleName] = useState('');
    const [newScaleNotes, setNewScaleNotes] = useState('');

    // Fetch scales for the logged-in user
    useEffect(() => {
        if (user) {
            const fetchScales = async () => {
                try {
                    const data = await getScalesAndChords(user.id); // Fetch scales for the logged-in user
                    setScales(data);
                } catch (error) {
                    console.error('Error fetching scales:', error.message);
                }
            };

            fetchScales();
        }
    }, [user]);

    // Add a new scale to the user's profile
    const addScale = async () => {
        if (!user) {
            alert('Please log in first!');
            return;
        }

        try {
            // Create a new scale in Supabase
            await createScaleOrChord(user.id, newScaleName, 'scale', newScaleNotes.split(','));

            // Re-fetch scales after adding a new one
            const data = await getScalesAndChords(user.id); // Fetch updated scales
            setScales(data);

            // Clear the input fields
            setNewScaleName('');
            setNewScaleNotes('');
        } catch (error) {
            console.error('Error creating scale:', error.message);
        }
    };

    // Delete a scale from the user's profile
    const handleDeleteScale = async (scaleId) => {
        try {
            await deleteScaleOrChord(scaleId);
            setScales((prev) => prev.filter(scale => scale.id !== scaleId)); // Remove the deleted scale from the state
        } catch (error) {
            console.error('Error deleting scale:', error.message);
        }
    };

    return (
        <div>
            <h1>Scales and Chords</h1>
            {user ? (
                <>
                    <div>
                        <input
                            type="text"
                            placeholder="Scale Name"
                            value={newScaleName}
                            onChange={(e) => setNewScaleName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Notes (comma separated)"
                            value={newScaleNotes}
                            onChange={(e) => setNewScaleNotes(e.target.value)}
                        />
                        <button onClick={addScale}>Add Scale</button>
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
                <p>Please log in to view and create scales/chords.</p>
            )}
        </div>
    );
};

export default ScaleList;
