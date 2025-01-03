import logo from './logo.svg';
import './App.css';
import PlayNotes from "./components/playNotes";
import { NoteProvider } from "./stateManager/NoteContext";
import Guitar from "./components/guitar/guitar";
import DetectChord from "./components/detectChord";
import DisplayNotes from "./components/displayNotes";
import {guitarContainerColor, mainBGColor, noColor} from "./stateManager/lightMode";
import {useState} from "react";
import Menu from "./components/menu/menu";


/**
 *
 *  TODO Ideas:
 *    * Chord Identifier
 *       - Can either select notes on fretboard in any tuning or input notes manually
 *       -
 *    * Guitar fretboard
 *       - All strings can be changed to whatever notes the user wants (needs auto update for chord and scale shapes)
 *       -
 *    * About Page
 *       - Basic theory
 *       - Description of how to use the app and it's purpose
 */


// Placeholder components for other instruments
const Piano = () => <div style={{ color: 'white' }}>Piano Component</div>;

function App() {
    const minWidth = '1000px';

    // State to track the selected instrument
    const [currentInstrument, setCurrentInstrument] = useState('Guitar');

    // Map of instruments to their components
    const instruments = {
        Guitar: <Guitar />,
        Piano: <Piano />,
    };

    return (
        <div className="App">
            <NoteProvider>
                <div style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: mainBGColor,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto'
                }}>
                    <div style={{
                        minHeight: '50px',
                        minWidth: minWidth,
                        // backgroundColor: 'red',
                        paddingRight: '10px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end', // Aligns the flex container to the right
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'
                    }}>
                        {/* Flex container for "About", "Profile", and Menu */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '20px', // Adds spacing between items
                        }}>
                            <span style={{color: 'black', cursor: 'pointer'}}>About</span>
                            <span style={{color: 'black', cursor: 'pointer'}}>Profile</span>
                            <Menu/>
                        </div>
                    </div>
                    {/*<div>
                        {Object.keys(instruments).map((instrument) => (
                            <button
                                key={instrument}
                                onClick={() => setCurrentInstrument(instrument)}
                                style={{
                                    padding: '10px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    margin: '0 5px',
                                    backgroundColor: currentInstrument === instrument ? 'lightblue' : 'white',
                                    border: '1px solid black',
                                    borderRadius: '5px'
                                }}
                            >
                                {instrument}
                            </button>
                        ))}
                    </div>*/}
                    <div style={{
                        height: '400px',
                        minHeight: '425px',
                        minWidth: minWidth,
                        backgroundColor: guitarContainerColor,
                        padding: '10px',
                        overflow: 'hidden',
                    }}>
                        {instruments[currentInstrument]}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        minHeight: '100px',
                        minWidth: minWidth,
                        backgroundColor: 'red',
                        padding: '10px'
                    }}>
                        <DisplayNotes/>
                        <DetectChord/>
                        <PlayNotes/>
                    </div>
                </div>
            </NoteProvider>
        </div>
    );
}

export default App;