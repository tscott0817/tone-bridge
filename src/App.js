import './App.css';
import { ThemeProvider } from "./stateManager/ThemeContext";
import ThemedApp from './themedApp';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <BrowserRouter> {/* This is needed to user react-router-dom for backend */}
                <ThemeProvider> {/* Warp entire app in this to set themes */}
                    <ThemedApp />
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;