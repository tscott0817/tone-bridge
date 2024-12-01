import React, { useEffect, useState } from "react";
import { Chord } from "tonal";
import { useNoteContext } from "../stateManager/NoteContext"; // Import the NoteContext

const SetChord = () => {
    const {
        selectedNotes,
        selectNote,
        unselectNote,
        setChordDegrees,
        clearSelectedNotes,
    } = useNoteContext();
    const [root, setRoot] = useState("C");
    const [chordType, setChordType] = useState("maj");
    const [chordNotes, setChordNotes] = useState([]); // Store chord notes for sequential selection

    const handleRootChange = (event) => {
        setRoot(event.target.value);
    };

    const handleChordTypeChange = (event) => {
        setChordType(event.target.value);
    };

    const setChord = () => {
        // Get the chord notes
        const notes = Chord.get(`${root}${chordType}`).notes.flatMap((note) => {
            const notes = [];
            for (let octave = 1; octave <= 7; octave++) {
                notes.push(note + octave); // Add notes for multiple octaves
            }
            return notes;
        });

        // Filter to get only unique pitch names
        const uniqueNotes = [...new Set(notes.map((note) => note.replace(/[0-9]/g, "")))];

        // Define the chord degree names
        const degreeNames = ["root", "third", "fifth", "seventh", "ninth", "eleventh", "thirteenth"];

        // Map chord notes to chord degrees
        const chordDegrees = degreeNames.reduce((acc, degree, index) => {
            if (uniqueNotes[index]) {
                acc[degree] = uniqueNotes[index];
            }
            return acc;
        }, {});

        // Update chord degrees globally
        setChordDegrees(chordDegrees);

        // Update the state for chordNotes to trigger the useEffect for selecting notes
        setChordNotes(notes);
    };

    // useEffect for sequential updates
    useEffect(() => {
        if (chordNotes.length > 0) {
            // Clear existing selected notes
            clearSelectedNotes();

            // Select new chord notes
            chordNotes.forEach((note) => selectNote(note));

            // Reset chordNotes to avoid re-triggering
            setChordNotes([]);
        }
    }, [chordNotes, clearSelectedNotes, selectNote]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "lightblue",
                height: "100%",
                width: "100%",
                overflow: "auto",
                gap: "10px",
            }}
        >
            <div>
                <label htmlFor="root">Root: </label>
                <select id="root" value={root} onChange={handleRootChange}>
                    {["C", "Db", "C#", "D", "Eb", "D#", "E", "F", "Gb", "F#", "G", "Ab", "G#", "A", "Bb", "A#", "B"].map(
                        (note) => (
                            <option key={note} value={note}>
                                {note}
                            </option>
                        )
                    )}
                </select>
            </div>
            <div>
                <label htmlFor="chordType">Chord Type: </label>
                <select id="chordType" value={chordType} onChange={handleChordTypeChange}>
                    {[
                        "major",
                        "major seventh",
                        "major ninth",
                        "major thirteenth",
                        "sixth",
                        "sixth added ninth",
                        "major seventh flat sixth",
                        "major seventh sharp eleventh",
                        "minor",
                        "minor seventh",
                        "minor/major seventh",
                        "minor sixth",
                        "minor ninth",
                        "minor/major ninth",
                        "minor eleventh",
                        "minor thirteenth",
                        "diminished",
                        "diminished seventh",
                        "half-diminished",
                        "dominant seventh",
                        "dominant ninth",
                        "dominant thirteenth",
                        "lydian dominant seventh",
                        "dominant flat ninth",
                        "dominant sharp ninth",
                        "altered",
                        "suspended fourth",
                        "suspended second",
                        "suspended fourth seventh",
                        "eleventh",
                        "suspended fourth flat ninth",
                    ].map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={setChord}>Set Chord</button>
        </div>
    );
};

export default SetChord;
