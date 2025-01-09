import './App.css';
import { ThemeProvider } from "./stateManager/ThemeContext";
import ThemedApp from './themedApp';
import { BrowserRouter } from 'react-router-dom';
import {OpenNotesProvider} from "./stateManager/OpenNotesContext";
import {NoteProvider} from "./stateManager/NoteContext";

const initialNotes = [40, 45, 50, 55, 59, 64];

function App() {
    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <BrowserRouter> {/* This is needed to user react-router-dom for backend */}
                <ThemeProvider> {/* Warp entire app in this to set themes */}
                    <OpenNotesProvider initialNotes={initialNotes}>
                    <NoteProvider> {/* All components within this can access global state of */}
                        <ThemedApp />
                    </NoteProvider>
                    </OpenNotesProvider>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;