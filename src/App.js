import './App.css';
import { ThemeProvider } from "./stateManager/ThemeContext";
import ThemedApp from './themedApp';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <BrowserRouter> {/* Wrap your app in BrowserRouter */}
                <ThemeProvider>
                    <ThemedApp />
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;