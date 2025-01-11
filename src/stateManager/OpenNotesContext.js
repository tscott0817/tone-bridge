import React, { createContext, useContext, useReducer } from 'react';

// Create the context
const OpenNotesContext = createContext(undefined);

// Define the reducer
const openNotesReducer = (state, action) => {
    console.log('Reducer action:', action); // Add this to debug the action
    switch (action.type) {
        // case 'SET_OPEN_NOTES':
        //     console.log('New notes:', action.payload); // Debug the payload
        //     return { ...state, openNotes: action.payload };
        case 'SET_OPEN_NOTES':
            return { ...state, openNotes: action.payload };
        case 'INCREMENT_NOTE':
            return {
                ...state,
                openNotes: state.openNotes.map((note, i) =>
                    i === action.payload ? note + 1 : note
                ),
            };
        case 'DECREMENT_NOTE':
            return {
                ...state,
                openNotes: state.openNotes.map((note, i) =>
                    i === action.payload ? note - 1 : note
                ),
            };
        case 'RESET_OPEN_NOTES':
            return { ...state, openNotes: state.initialNotes };
        // case 'SELECT_OPEN_NOTE':
        //     return { ...state, openNotes: [...state.openNotes, action.payload] };
        case 'SELECT_OPEN_NOTE':
            return { ...state, openNotes: [action.payload] };
        case 'UNSELECT_OPEN_NOTE':
            return { ...state, openNotes: state.openNotes.filter(note => note !== action.payload)};
        default:
            return state;
    }
};

// Define the provider
const OpenNotesProvider = ({ children, initialNotes }) => {
    const [state, dispatch] = useReducer(openNotesReducer, {
        openNotes: initialNotes,
        initialNotes, // Keep track of the initial notes for reset
        selectedOpenNotes: [], // Track selected notes
    });

    // Action methods
    const setOpenNotes = (notes) => {
        dispatch({ type: 'SET_OPEN_NOTES', payload: notes });
    };

    const incrementNote = (index) => {
        dispatch({ type: 'INCREMENT_NOTE', payload: index });
    };

    const decrementNote = (index) => {
        dispatch({ type: 'DECREMENT_NOTE', payload: index });
    };

    const resetOpenNotes = () => {
        dispatch({ type: 'RESET_OPEN_NOTES' });
    };

    // Select and unselect open notes
    const selectOpenNote = (note) => {
        if (!state.openNotes.includes(note)) {
            dispatch({ type: 'SELECT_OPEN_NOTE', payload: note });
        }
    };

    const unselectOpenNote = (note) => {
        dispatch({ type: 'UNSELECT_OPEN_NOTE', payload: note });
    };

    // Provide state and action methods to consumers
    return (
        <OpenNotesContext.Provider
            value={{
                openNotes: state.openNotes,
                selectOpenNote,
                unselectOpenNote, // Provide select/unselect methods
                setOpenNotes,
                incrementNote,
                decrementNote,
                resetOpenNotes,
            }}
        >
            {children}
        </OpenNotesContext.Provider>
    );
};

// Define the custom hook
const useOpenNotesContext = () => {
    const context = useContext(OpenNotesContext);
    if (!context) {
        throw new Error(
            'useOpenNotesContext must be used within an OpenNotesProvider'
        );
    }
    return context;
};

export { OpenNotesProvider, useOpenNotesContext };



