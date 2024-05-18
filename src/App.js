import logo from './logo.svg';
import './App.css';
import PlayNotes from "./components/playNotes";
import { NoteProvider } from "./stateManager/NoteContext";
import Guitar from "./components/guitar/guitar";
import SetScale from "./components/setScale";
import SetChord from "./components/setChord";
import DetectChord from "./components/detectChord";


/**
 * TODO Ideas:
 *   - Chord Identifier
 *      - Can either select notes on fretboard in any tuning or input notes manually
 *      -
 *
 *   - Guitar fretboard
 *      - All strings can be changed to whatever notes the user wants (needs auto update for chord and scale shapes)
 *      -
 *
 */
function App() {

    return (
        <div className="App">
            <NoteProvider>
                <div style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'pink',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto'
                }}>
                    <div style={{
                        height: '10%',
                        minHeight: '50px',
                        bottom: 0,
                        minWidth: '1000px',
                        backgroundColor: 'red',
                        padding: '10px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <SetScale/>
                        <SetChord/>
                    </div>
                    <div style={{
                        height: '400px',
                        minHeight: '375px',
                        minWidth: '1000px',
                        backgroundColor: 'teal',
                        padding: '10px',
                        overflow: 'hidden'
                    }}>
                        <Guitar/>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '20%',
                        minHeight: '100px',
                        minWidth: '1000px',
                        backgroundColor: 'rebeccapurple',
                        padding: '10px'
                    }}>
                        <DetectChord/>
                        <PlayNotes/>
                    </div>
                </div>

            </NoteProvider>
        </div>
    );
}

export default App;
