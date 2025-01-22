import React, { useState, useEffect } from 'react';

const RetrieveData = ({ scalesList, chordsList, openNotesList, handleDeleteScale, handleSelectScale, handleOpenNotes }) => {
    const [activeSection, setActiveSection] = useState('scales');

    return (
        <div style={{
            //backgroundColor: 'red',
            position: 'absolute',
            top: '80px',
            bottom: '0',
            width: '90%',
        }}>
            {/* Toggle buttons for sections */}
            <div style={{
                fontSize: '32px',
            }}>
                Saved Data
            </div>

            <div style={{
                display: 'flex',
                gap: '5px', // Adds space between buttons
                marginBottom: '24px',
                justifyContent: 'center', // Centers the buttons horizontally
            }}>
                <button
                    onClick={() => setActiveSection('scales')}
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        backgroundColor: activeSection === 'scales' ? '#007BFF' : '#cccccc', // Blue if selected, gray if not
                        color: activeSection === 'scales' ? '#fff' : '#333',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease, transform 0.2s ease',
                        fontSize: '16px',
                        fontWeight: '500',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        outline: 'none',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                    Scales
                </button>
                <button
                    onClick={() => setActiveSection('chords')}
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        backgroundColor: activeSection === 'chords' ? '#007BFF' : '#cccccc', // Blue if selected, gray if not
                        color: activeSection === 'chords' ? '#fff' : '#333',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease, transform 0.2s ease',
                        fontSize: '16px',
                        fontWeight: '500',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        outline: 'none',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                    Chords
                </button>
                <button
                    onClick={() => setActiveSection('openNotes')}
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        backgroundColor: activeSection === 'openNotes' ? '#007BFF' : '#cccccc', // Blue if selected, gray if not
                        color: activeSection === 'openNotes' ? '#fff' : '#333',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease, transform 0.2s ease',
                        fontSize: '16px',
                        fontWeight: '500',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        outline: 'none',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                    Tunings
                </button>
            </div>


            {/* Conditionally render based on active section */}
            <div style={{
                //backgroundColor: 'lightblue',
                position: 'absolute',
                top: '100px',
                bottom: '0',
            }}>
                {activeSection === 'scales' && (
                    <>
                        {/*<div style={{*/}
                        {/*    borderBottom: '2px solid #ccc',*/}
                        {/*    fontSize: '32px',*/}
                        {/*}}>*/}
                        {/*    Scales*/}
                        {/*</div>*/}
                        <div style={{
                            overflowY: 'auto',
                            height: '100%',
                            maxHeight: '400px',
                        }}>
                            {scalesList.map((notes) => (
                                <div key={notes.id} style={{marginBottom: '15px'}}>
                                    <div style={{marginBottom: '5px'}}>
                                        <strong>{notes.name}</strong>
                                    </div>
                                    <div style={{marginBottom: '5px'}}>
                                        <span>{notes.data.join(', ')}</span>
                                    </div>
                                    <div>
                                        <button onClick={() => handleDeleteScale(notes.id)}>Delete</button>
                                        <button onClick={() => handleSelectScale(notes.data)}>Show Scale</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeSection === 'chords' && (
                    <>
                        {/*<div style={{*/}
                        {/*    borderBottom: '2px solid #ccc',*/}
                        {/*    fontSize: '32px',*/}
                        {/*}}>*/}
                        {/*    Chords*/}
                        {/*</div>*/}
                        <div style={{
                            overflowY: 'auto',
                            height: '100%',
                            maxHeight: '400px',
                        }}>
                            {chordsList.map((notes) => (
                                <div key={notes.id} style={{marginBottom: '15px'}}>
                                    <div style={{marginBottom: '5px'}}>
                                        <strong>{notes.name}</strong>
                                    </div>
                                    <div style={{marginBottom: '5px'}}>
                                        <span>{notes.data.join(', ')}</span>
                                    </div>
                                    <div>
                                        <button onClick={() => handleDeleteScale(notes.id)}>Delete</button>
                                        <button onClick={() => handleSelectScale(notes.data)}>Show Chord</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeSection === 'openNotes' && (
                    <>
                        {/*<div style={{*/}
                        {/*    borderBottom: '2px solid #ccc',*/}
                        {/*    fontSize: '32px',*/}
                        {/*}}>*/}
                        {/*    Tunings*/}
                        {/*</div>*/}
                        <div style={{
                            overflowY: 'auto',
                            height: '100%',
                            maxHeight: '400px',
                        }}>
                            {openNotesList.map((notes) => (
                                <div key={notes.id} style={{marginBottom: '15px'}}>
                                    <div style={{marginBottom: '5px'}}>
                                        <strong>{notes.name}</strong>
                                    </div>
                                    <div style={{marginBottom: '5px'}}>
                                        <span>{notes.data.join(', ')}</span>
                                    </div>
                                    <div>
                                        <button onClick={() => handleDeleteScale(notes.id)}>Delete</button>
                                        <button onClick={() => handleOpenNotes(notes.data)}>Change Tuning</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default RetrieveData;
