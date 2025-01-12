import React, { useState } from 'react';

const AddData = ({ selectedScaleName, setSelectedScaleName, selectedType, setSelectedType, addSelectedNotes, addOpenNotes }) => {
    return (
        <div style={{
            padding: '10px' ,
            //borderBottom: '2px solid #ccc',
            //backgroundColor: 'green'
        }}>
            <div style={{ fontSize: '32px' }}>
                Add Data
            </div>
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

            <div style={{ marginBottom: '10px' }}>
                <button onClick={addSelectedNotes}>Add Selected Notes</button>
            </div>

            <div>
                <button onClick={addOpenNotes}>Save Open Notes</button>
            </div>
        </div>
    );
};

export default AddData;
