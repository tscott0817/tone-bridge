import logo from './logo.svg';
import './App.css';
import IdentifyChord from "./components/identifyChord";
import { NoteProvider } from "./stateManager/NoteContext";
import Guitar from "./components/guitar/guitar";
import SetScale from "./components/setScale";
import SetChord from "./components/setChord";


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
                    <div style={{flex: 1, height: '325px', minHeight: '375px', minWidth: '1000px', backgroundColor: 'teal', padding: '10px', overflow: 'hidden'}}>
                        {<Guitar />}
                    </div>
                    <div style={{height: '40%', bottom: 0, minWidth: '1000px', backgroundColor: 'red', padding: '10px', overflow: 'hidden'}}>
                        <div style={{display: 'flex', height: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <IdentifyChord/>
                            <SetScale />
                            <SetChord />
                        </div>
                    </div>
                </div>

            </NoteProvider>
        </div>
    );
}
export default App;
