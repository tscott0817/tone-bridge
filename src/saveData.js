import React, { useEffect, useState } from 'react';
import { useNoteContext } from "./stateManager/NoteContext";
import { getScalesAndChords, createScaleOrChord, deleteScaleOrChord } from './backend/api';
import {useOpenNotesContext} from "./stateManager/OpenNotesContext";
import {Note} from "tonal";

const SaveData = ({ user }) => {
    const {openNotes, setOpenNotes, incrementNote, decrementNote, resetOpenNotes} = useOpenNotesContext();
    const { selectedNotes, selectNote, unselectNote } = useNoteContext();
    const [scales, setScales] = useState([]);
    const [newScaleName, setNewScaleName] = useState('');
    const [newScaleNotes, setNewScaleNotes] = useState('');
    const [selectedType, setSelectedType] = useState('scale');
    const [selectedScaleName, setSelectedScaleName] = useState('');
    const [pendingNotes, setPendingNotes] = useState([]); // To enforce clearing and adding notes in sequence
    const [keyNote, setKeyNote] = useState("C");
    const [scaleType, setScaleType] = useState("major");

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const data = await getScalesAndChords(user.id, selectedType);
                    setScales(data);
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
            setScales(data);

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
            setScales(data);

            setSelectedScaleName('');
        } catch (error) {
            console.error('Error creating data:', error.message);
        }
    };

    const handleDeleteScale = async (scaleId) => {
        try {
            await deleteScaleOrChord(scaleId);
            setScales((prev) => prev.filter(scale => scale.id !== scaleId)); // Remove the deleted item from the state
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
            setScales(data);

            // Clear the input fields
            setSelectedScaleName('');
        } catch (error) {
            console.error('Error creating data:', error.message);
        }
    };

    const handleSelectScale = (scaleNotes) => {
        // Clear existing selected notes before adding new ones
        selectedNotes.forEach(note => unselectNote(note)); // Unselect all existing notes

        // Create a temporary list of notes (similar to pendingNotes)
        const octaveNotes = scaleNotes.reduce((noteArray, note) => {
            for (let octave = 1; octave <= 7; octave++) {
                noteArray.push(`${note}${octave}`);
            }
            return noteArray;
        }, []);

        // Store new notes for selection
        setPendingNotes(octaveNotes);
    };

    useEffect(() => {
        if (pendingNotes.length > 0) {
            pendingNotes.forEach(note => selectNote(note));
            setPendingNotes([]);
        }
    }, [pendingNotes, selectNote]);

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
                        <button onClick={addOpenNotes}>Save Open Notes</button>
                    </div>

                    <ul>
                        {scales.map((scale) => (
                            <li key={scale.id}>
                                <strong>{scale.name}</strong>: {scale.data.join(', ')}
                                <button onClick={() => handleDeleteScale(scale.id)}>Delete</button>
                                <button onClick={() => handleSelectScale(scale.data)}>Select Notes</button>
                                {/*<button onClick={() => updateOpenNotesFromDatabase(scale.data)}>Open Notes</button>*/}

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
