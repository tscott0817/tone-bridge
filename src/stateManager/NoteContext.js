import React, { createContext, useContext, useReducer } from 'react';

const NoteContext = createContext(undefined);

const NoteReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_NOTE':
            return { ...state, selectedNotes: [...state.selectedNotes, action.payload] };
        case 'UNSELECT_NOTE':
            return { ...state, selectedNotes: state.selectedNotes.filter(note => note !== action.payload) };
        case 'SET_ROOT_NOTE':
            return { ...state, rootNote: action.payload };
        default:
            return state;
    }
};

const NoteProvider = ({ children }) => {
    const [state, dispatch] = useReducer(NoteReducer, { selectedNotes: [], rootNote: " " });

    const selectNote = (note) => {
        if (!state.selectedNotes.includes(note)) {
            dispatch({ type: 'SELECT_NOTE', payload: note });
        } else {
            console.log('Note is already selected.');
        }
    };

    const unselectNote = (note) => {
        dispatch({ type: 'UNSELECT_NOTE', payload: note });
    };

    const setRootNote = (rootNote) => {
        dispatch({ type: 'SET_ROOT_NOTE', payload: rootNote });
    };

    return (
        <NoteContext.Provider
            value={{ selectedNotes: state.selectedNotes, rootNote: state.rootNote, selectNote, unselectNote, setRootNote }}
        >
            {children}
        </NoteContext.Provider>
    );
};

const useNoteContext = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNoteContext must be used within a NoteProvider');
    }
    return context;
};

export { NoteProvider, useNoteContext };
