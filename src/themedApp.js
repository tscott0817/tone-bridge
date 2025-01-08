import logo from './logo.svg';
import './App.css';
import PlayNotes from "./components/playNotes";
import { NoteProvider } from "./stateManager/NoteContext";
import Guitar from "./components/guitar/guitar";
import DetectChord from "./components/detectChord";
import DisplayNotes from "./components/displayNotes";
import {guitarContainerColor, mainBGColor, noColor} from "./stateManager/lightMode";
import {useEffect, useState} from "react";
import Menu from "./components/menu/menu";
import { useThemeContext } from "./stateManager/ThemeContext";
import * as lightColors from "./stateManager/lightMode";
import * as darkColors from "./stateManager/darkMode";
import {FaSun, FaMoon} from "react-icons/fa";
import Auth from "./backend/auth";
import SaveData from "./saveData";
import {supabase} from "./backend/client";
import {logoutUser} from "./backend/api";
import {Scale} from "tonal"; // Import ScaleList


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

function ThemedApp() {
    const minWidth = '1000px';
    const { theme, toggleTheme } = useThemeContext();
    const backgroundColor = theme === lightColors ? lightColors.mainBGColor : darkColors.mainBGColor;

    // State to track the selected instrument
    const [currentInstrument, setCurrentInstrument] = useState('Guitar');

    // Map of instruments to their components
    const instruments = {
        Guitar: <Guitar />,
        Piano: <Piano />,
    };

    const [user, setUser] = useState(null); // Track user state
    console.log("Current User:", user); // Check the current user state
    const [key, setKey] = useState(0); // Add a key to force re-render

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();

        // Handle logout when the page is closed or refreshed
        const handleBeforeUnload = async (event) => {
            if (user) {
                await handleLogout();
            }
        };

        // Add event listener for beforeunload
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [user]); // Dependency on user to track changes

    const handleLogout = async () => {
        try {
            await logoutUser(); // Use the logoutUser function from your API
            setUser(null); // Clear user state
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="themedApp">
            <NoteProvider>
                <div style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: theme === lightColors ? lightColors.mainBGColor : darkColors.mainBGColor,
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
                            //backgroundColor: 'red',
                            gap: '20px', // Adds spacing between items
                        }}>
                            <span style={{color: 'black', cursor: 'pointer'}}>About</span>
                            <span style={{color: 'black', cursor: 'pointer'}}>Profile</span>
                            <Menu/>
                            <div style={{
                                cursor: 'pointer',
                                marginRight: '10px',
                                paddingTop: '3px',
                                //backgroundColor: 'blue'
                            }}>
                                {theme === lightColors ? (
                                    <FaMoon onClick={toggleTheme} style={{
                                        color: lightColors.tempColor,
                                        fontSize: '25px',
                                        transform: 'scaleX(-1)'
                                    }}/>
                                ) : (
                                    <FaSun onClick={toggleTheme}
                                           style={{color: darkColors.tempColor, fontSize: '24px'}}/>
                                )}
                            </div>
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

                    <div style={{display: 'flex', flexDirection: 'column', overflow: 'auto'}}>
                        {/* Render the logout button when user is logged in */}
                        {user ? (
                            <div>
                                <h1>Welcome, {user.email}!</h1>
                                <button onClick={handleLogout}>Logout</button>

                                <SaveData user={user} />
                            </div>
                        ) : (
                            // Render Auth component when no user is logged in
                            <Auth user={user} setUser={setUser}/>
                        )}
                    </div>

                </div>
            </NoteProvider>
        </div>
    );
}

export default ThemedApp;