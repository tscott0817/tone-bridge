import logo from './logo.svg';
import './App.css';
import Tests from './components/tests'; // Import the Tests component
import TestsCanvas from "./components/testsCanvas";
import GuitarFretboard from "./components/guitarFretboard";
import IdentifyChord from "./components/identifyChord";
import { NoteProvider } from "./stateManager/NoteContext";
import Guitar from "./components/guitar";
import QuickDisplay from "./components/quickDisplay";


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
                <div style={{width: '100vw', height: '100vh', backgroundColor: 'pink', display: 'flex', flexDirection: 'column'}}>
                    <div style={{height: '325px', minHeight: '325px', minWidth: '800px', backgroundColor: 'teal', padding: '10px'}}>
                        {/*<GuitarFretboard/>*/}
                        {<Guitar />}
                    </div>
                    {/*<div style={{width: '100%',backgroundColor: 'green', marginTop: '10px'}}>*/}
                    {/*    <QuickDisplay />*/}
                    {/*</div>*/}
                    <div style={{flex: 1, height: '100%', backgroundColor: 'red', padding: '10px', overflow: 'hidden'}}>
                        <IdentifyChord/>
                    </div>
                </div>

            </NoteProvider>
        </div>
    );
}
export default App;
