import logo from './logo.svg';
import './App.css';
import PlayNotes from "./components/playNotes";
import { NoteProvider } from "./stateManager/NoteContext";
import Guitar from "./components/guitar";
import SetScale from "./components/setScale";
import SetChord from "./components/setChord";
import DetectChord from "./components/detectChord";
import DisplayNotes from "./components/DisplayNotes";
import {mainBGColor} from "./stateManager/lightMode";
import {useState} from "react";


/**
 *
 *  TODO Ideas:
 *     *   * Chord Identifier
 *       - Can either select notes on fretboard in any tuning or input notes manually
 *       -
 *    * Guitar fretboard
 *       - All strings can be changed to whatever notes the user wants (needs auto update for chord and scale shapes)
 *       -
 *
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
                        backgroundColor: 'red',
                        padding: '10px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        {'Header'}
                        {'About'}
                        {'Theory'}
                        {'Profile'}
                    </div>
                    <div>
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
                    </div>
                    <div style={{
                        minHeight: '50px',
                        minWidth: minWidth,
                        backgroundColor: 'red',
                        padding: '10px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <SetScale/>
                        <SetChord/>
                    </div>
                    <div style={{
                        height: '400px',
                        minHeight: '425px',
                        minWidth: minWidth,
                        backgroundColor: 'teal',
                        padding: '10px',
                        overflow: 'hidden'
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
                        <DetectChord/>
                        <PlayNotes/>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        minHeight: '100px',
                        minWidth: minWidth,
                        backgroundColor: 'rebeccapurple',
                        padding: '10px'
                    }}>
                        <DisplayNotes/>
                    </div>
                </div>
            </NoteProvider>
        </div>
    );
}

export default App;


// TODO: This is the start for mobile:

/*import logo from './logo.svg';
import './App.css';
import PlayNotes from "./components/playNotes";
import { NoteProvider } from "./stateManager/NoteContext";
import Guitar from "./components/guitar";
import SetScale from "./components/setScale";
import SetChord from "./components/setChord";
import DetectChord from "./components/detectChord";
import DisplayNotes from "./components/DisplayNotes";
import {mainBGColor} from "./stateManager/lightMode";
import {useEffect, useState} from "react";


/!**
 *
 *  TODO Ideas:
 *     *   * Chord Identifier
 *       - Can either select notes on fretboard in any tuning or input notes manually
 *       -
 *    * Guitar fretboard
 *       - All strings can be changed to whatever notes the user wants (needs auto update for chord and scale shapes)
 *       -
 *
 *!/


// Placeholder components for other instruments
const Piano = () => <div style={{ color: 'white' }}>Piano Component</div>;

function App() {
    const minWidth = '1000px';

    const [currentInstrument, setCurrentInstrument] = useState('Guitar');
    const [isRotated, setIsRotated] = useState(false);

    const instruments = {
        Guitar: <Guitar />,
        Piano: <Piano />,
    };

    useEffect(() => {
        const handleResize = () => {
            setIsRotated(window.innerWidth < 600); // Rotate if screen width is less than 600px
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Check initial size

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                    <div>
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
                    </div>
                    <div style={{
                        minHeight: '50px',
                        minWidth: minWidth,
                        backgroundColor: 'red',
                        padding: '10px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <SetScale />
                        <SetChord />
                    </div>
                    <div
                        style={{
                            height: '400px',
                            minHeight: '425px',
                            minWidth: minWidth,
                            backgroundColor: 'teal',
                            padding: '10px',
                            overflow: 'hidden',
                            transform: isRotated ? 'rotate(90deg)' : 'none',
                            transformOrigin: 'center',
                            transition: 'transform 0.3s ease',
                        }}
                    >
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
                        <DetectChord />
                        <PlayNotes />
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        minHeight: '100px',
                        minWidth: minWidth,
                        backgroundColor: 'rebeccapurple',
                        padding: '10px'
                    }}>
                        <DisplayNotes />
                    </div>
                </div>
            </NoteProvider>
        </div>
    );
}

export default App;*/

