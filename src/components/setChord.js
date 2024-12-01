import React, {useEffect, useState} from "react";
import {Chord} from "tonal";
import {useNoteContext} from "../stateManager/NoteContext"; // Import the NoteContext

const SetChord = () => {
    const {selectedNotes, selectNote, unselectNote, setChordDegrees} = useNoteContext(); // Use the NoteContext
    const [root, setRoot] = useState("C");
    const [chordType, setChordType] = useState("maj");

    const handleRootChange = (event) => {
        setRoot(event.target.value);
    };

    const handleChordTypeChange = (event) => {
        setChordType(event.target.value);
    };

    const handleClear = () => {
        selectedNotes.forEach((note) => unselectNote(note));
    };

    const setChord = () => {
        // Get the chord notes
        const chordNotes = Chord.get(`${root}${chordType}`).notes.flatMap(note => {
            const notes = [];
            for (let octave = 1; octave <= 7; octave++) {
                notes.push(note + octave);  // Add notes for multiple octaves
            }
            return notes;
        });

        console.log("Chord Notes:", chordNotes);

        // Filter to get only the unique notes (e.g., C, E, G)
        const uniqueNotes = [...new Set(chordNotes.map(note => note[0]))];  // Assuming note[0] is the pitch, like 'C', 'E', 'G'

        // Define the chord degree names
        const degreeNames = ['root', 'third', 'fifth', 'seventh', 'ninth', 'eleventh', 'thirteenth']; // TODO: This mapping only works for diatonic chords

        // Map chord notes to chord degrees (1, 3, 5, 7, 9, 11, 13)
        const chordDegrees = degreeNames.reduce((acc, degree, index) => {
            // Only assign the degree if the corresponding note exists in uniqueNotes
            if (uniqueNotes[index]) {
                acc[degree] = uniqueNotes[index]; // Assign the note to the degree
            }
            return acc;
        }, {});

        // Update chord degrees globally
        setChordDegrees(chordDegrees); // Set chord degrees in global state

        // Log chord degrees for debugging
        console.log("Chord Degrees:", chordDegrees);

        // Clear the existing selected notes
        //selectedNotes.forEach(note => unselectNote(note));

        // Add all the notes of the selected chord to the selectedNotes array
        chordNotes.forEach(note => selectNote(note));
    };

    useEffect(() => {
        // This is just to the guitar updates every time a new note is added outside of the guitar component
    }, [selectedNotes]);


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'lightblue',
            height: '100%',
            width: "100%",
            overflow: 'auto',
            gap: '10px'
        }}>
            <div>
                <label htmlFor="root">Root: </label>
                <select id="root" value={root} onChange={handleRootChange}>
                    {["C", "Db", "C#", "D", "Eb", "D#", "E", "F", "Gb", "F#", "G", "Ab", "G#", "A", "Bb", "A#", "B"].map((note) => (
                        <option key={note} value={note}>{note}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="chordType">Chord Type: </label>
                <select id="chordType" value={chordType} onChange={handleChordTypeChange}>
                    <option value="major">Major</option>
                    <option value="major seventh">Maj7</option>
                    <option value="major ninth">Maj9</option>
                    <option value="major thirteenth">Maj13</option>
                    <option value="sixth">add6</option>
                    <option value="sixth added ninth">6/9</option>
                    <option value="major seventh flat sixth">Maj7b6</option>
                    <option value="major seventh sharp eleventh">Maj7#11</option>
                    <option value="minor">minor</option>
                    <option value="minor seventh">m7</option>
                    <option value="minor/major seventh">min/Maj7</option>
                    <option value="minor sixth">m6</option>
                    <option value="minor ninth">m9</option>
                    <option value="minor/major ninth">mMaj9</option>
                    <option value="minor eleventh">m11</option>
                    <option value="minor thirteenth">m13</option>
                    <option value="diminished">diminished</option>
                    <option value="diminished seventh">dim7</option>
                    <option value="half-diminished">m7b5</option>
                    <option value="dominant seventh">dom7</option>
                    <option value="dominant ninth">dom9</option>
                    <option value="dominant thirteenth">dom13</option>
                    <option value="lydian dominant seventh">dom7#11</option>
                    <option value="dominant flat ninth">dom7b9</option>
                    <option value="dominant sharp ninth">dom7#9</option>
                    <option value="altered">alt7</option>
                    <option value="suspended fourth">sus4</option>
                    <option value="suspended second">sus2</option>
                    <option value="suspended fourth seventh">7sus4</option>
                    <option value="eleventh">11</option>
                    <option value="suspended fourth flat ninth">7b9sus4</option>
                </select>
            </div>
            <button onClick={setChord}>Set Chord</button>
        </div>
    );
};

export default SetChord;
