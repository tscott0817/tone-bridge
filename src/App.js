import logo from './logo.svg';
import './App.css';
import Tests from './components/tests'; // Import the Tests component
import TestsCanvas from "./components/testsCanvas";
import GuitarFretboard from "./components/guitarFretboard";
import IdentifyChord from "./components/identifyChord";
import { NoteProvider } from "../src/stateManager/NoteContext";


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
                <div style={{width: '100vw', height: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column'}}>
                    <div style={{flex: 1, height: '50%', backgroundColor: 'yellow', padding: '10px'}}>
                        <GuitarFretboard/>
                    </div>
                    <div style={{flex: 1, height: '50%', backgroundColor: 'red', padding: '10px', overflow: 'hidden'}}>
                        <IdentifyChord/>
                    </div>
                </div>
            </NoteProvider>
        </div>
    );
}
export default App;
