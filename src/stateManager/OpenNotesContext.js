// import React, { createContext, useContext, useReducer } from 'react';
//
// // Create the context
// const OpenNoteContext = createContext(undefined);
//
// // Define the reducer
// const OpenNoteReducer = (state, action) => {
//     switch (action.type) {
//         case 'SELECT_NOTE':
//             return { ...state, selectedNotes: [...state.selectedNotes, action.payload] };
//         case 'UNSELECT_NOTE':
//             return { ...state, selectedNotes: state.selectedNotes.filter(note => note !== action.payload)};
//         case 'SET_SCALE_DEGREES':
//             return { ...state, scaleDegrees: action.payload, chordDegrees: {}, selectedNotes: [] };
//         case 'SET_CHORD_DEGREES':
//             return { ...state, chordDegrees: action.payload, scaleDegrees: {}, selectedNotes: [] };
//         default:
//             return state;
//     }
// };
//
// // Define the provider
// const OpenNoteProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(OpenNoteReducer, {
//         selectedNotes: [],
//         scaleDegrees: {},
//         chordDegrees: {},
//     });
//
//     // Action methods
//     const selectNote = (note) => {
//         if (!state.selectedNotes.includes(note)) {
//             dispatch({ type: 'SELECT_NOTE', payload: note });
//         }
//     };
//
//     const unselectNote = (note) => {
//         dispatch({ type: 'UNSELECT_NOTE', payload: note });
//     };
//
//     const setScaleDegrees = (degrees) => {
//         dispatch({ type: 'SET_SCALE_DEGREES', payload: degrees });
//     };
//
//     const setChordDegrees = (degrees) => {
//         dispatch({ type: 'SET_CHORD_DEGREES', payload: degrees });
//     };
//
//     // Provide state and action methods to consumers
//     return (
//         <OpenNoteContext.Provider
//             value={{
//                 selectedNotes: state.selectedNotes,
//                 scaleDegrees: state.scaleDegrees,
//                 chordDegrees: state.chordDegrees,
//                 selectNote,
//                 unselectNote,
//                 setScaleDegrees,
//                 setChordDegrees,
//             }}
//         >
//             {children}
//         </OpenNoteContext.Provider>
//     );
// };
//
// // Define the custom hook
// const useNoteContext = () => {
//     const context = useContext(OpenNoteContext);
//     if (!context) {
//         throw new Error('useNoteContext must be used within a NoteProvider');
//     }
//     return context;
// };
//
// export { OpenNoteProvider, useNoteContext };




import React, { createContext, useContext, useReducer } from 'react';

// Create the context
const OpenNotesContext = createContext(undefined);

// Define the reducer
const openNotesReducer = (state, action) => {
    console.log('Reducer action:', action); // Add this to debug the action
    switch (action.type) {
        case 'SET_OPEN_NOTES':
            console.log('New notes:', action.payload); // Debug the payload
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
        default:
            return state;
    }
};

// Define the provider
const OpenNotesProvider = ({ children, initialNotes }) => {
    const [state, dispatch] = useReducer(openNotesReducer, {
        openNotes: initialNotes,
        initialNotes, // Keep track of the initial notes for reset
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

    // Provide state and action methods to consumers
    return (
        <OpenNotesContext.Provider
            value={{
                openNotes: state.openNotes,
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
