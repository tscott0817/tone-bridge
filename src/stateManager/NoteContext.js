import React, { createContext, useContext, useReducer } from 'react';

// Create the context
const NoteContext = createContext(undefined);

// Define the reducer
const NoteReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_NOTE':
            return { ...state, selectedNotes: [...state.selectedNotes, action.payload] };
        case 'UNSELECT_NOTE':
            return { ...state, selectedNotes: state.selectedNotes.filter(note => note !== action.payload)};
        case 'SET_SCALE_DEGREES':
            return { ...state, scaleDegrees: action.payload, chordDegrees: {}, selectedNotes: [] };
        case 'SET_CHORD_DEGREES':
            return { ...state, chordDegrees: action.payload, scaleDegrees: {}, selectedNotes: [] };
        default:
            return state;
    }
};

// Define the provider
const NoteProvider = ({ children }) => {
    const [state, dispatch] = useReducer(NoteReducer, {
        selectedNotes: [],
        scaleDegrees: {},
        chordDegrees: {},
    });

    // Action methods
    const selectNote = (note) => {
        if (!state.selectedNotes.includes(note)) {
            dispatch({ type: 'SELECT_NOTE', payload: note });
        }
    };

    const unselectNote = (note) => {
        dispatch({ type: 'UNSELECT_NOTE', payload: note });
    };

    const setScaleDegrees = (degrees) => {
        dispatch({ type: 'SET_SCALE_DEGREES', payload: degrees });
    };

    const setChordDegrees = (degrees) => {
        dispatch({ type: 'SET_CHORD_DEGREES', payload: degrees });
    };

    // Provide state and action methods to consumers
    return (
        <NoteContext.Provider
            value={{
                selectedNotes: state.selectedNotes,
                scaleDegrees: state.scaleDegrees,
                chordDegrees: state.chordDegrees,
                selectNote,
                unselectNote,
                setScaleDegrees,
                setChordDegrees,
            }}
        >
            {children}
        </NoteContext.Provider>
    );
};

// Define the custom hook
const useNoteContext = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNoteContext must be used within a NoteProvider');
    }
    return context;
};

export { NoteProvider, useNoteContext };
