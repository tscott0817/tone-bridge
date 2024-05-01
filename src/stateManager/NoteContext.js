import React, { createContext, useContext, useReducer } from 'react';

const NoteContext = createContext(undefined);

const NoteReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_NOTE':
            return [...state, action.payload];
        case 'UNSELECT_NOTE':
            return state.filter(note => note !== action.payload);
        default:
            return state;
    }
};

const NoteProvider = ({ children }) => {
    const [selectedNotes, dispatch] = useReducer(NoteReducer, []);

    const selectNote = (note) => {
        // Check if the Note is not already in the selectedNotes array
        if (!selectedNotes.includes(note)) {
            // Dispatch the action to update the state
            dispatch({ type: 'SELECT_NOTE', payload: note });
        } else {
            console.log('Note is already selected.');
        }
    };

    const unselectNote = (note) => {
        dispatch({ type: 'UNSELECT_NOTE', payload: note });
    };

    return (
        <NoteContext.Provider
            value={{ selectedNotes, selectNote, unselectNote }}
        >
            {children}
        </NoteContext.Provider>
    );
};

const useNoteContext = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNoteContext must be used within an NoteProvider');
    }
    return context;
};

export { NoteProvider, useNoteContext };
