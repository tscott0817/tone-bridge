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
import SaveData from "./components/menu/menuOptions/saveData";
import {supabase} from "./backend/client";
import {logoutUser} from "./backend/api";
import {Scale} from "tonal"; // Import ScaleList


/**
 *
 *  TODO:
 *    * Make user, setUser, and openNotes into a global context (currently prop drilling)
 *    * About Page
 *       - Basic theory
 *       - Description of how to use the app and it's purpose
 */


// Placeholder components for other instruments
const Piano = () => <div style={{ color: 'white' }}>Piano Component</div>;

function ThemedApp() {
    const minWidth = '1000px';
    const { theme, toggleTheme } = useThemeContext();
    // const [user, setUser] = useState(null);
    const [currentInstrument, setCurrentInstrument] = useState('Guitar');

    // const instruments = {
    //     Guitar: <Guitar openNotes={openNotes} setOpenNotes={setOpenNotes} initialNotes={initialNotes}/>,
    //     Piano: <Piano />,
    // };

    // const handleLogout = async () => {
    //     try {
    //         await logoutUser();
    //         setUser(null);
    //     } catch (error) {
    //         console.error('Error logging out:', error);
    //     }
    // };
    //
    // useEffect(() => {
    //     const checkUser = async () => {
    //         const { data: { user } } = await supabase.auth.getUser();
    //         setUser(user);
    //     };
    //     checkUser();
    //
    //     const handleBeforeUnload = async (event) => {
    //         if (user) {
    //             await handleLogout();
    //         }
    //     };
    //
    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, [user]);

    return (
        <div className="themedApp">
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
                        backgroundColor: theme === lightColors ? lightColors.headerBGColor : darkColors.headerBGColor,
                        paddingRight: '10px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end', // Aligns the flex container to the right
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            //backgroundColor: 'red',
                            gap: '20px',
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
                    {/* TODO: This is for swapping between instruments. Not added currently */}
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
                        height: '450px',
                        minHeight: '450px',
                        minWidth: minWidth,
                        backgroundColor: theme === lightColors ? lightColors.guitarContainerColor : darkColors.guitarContainerColor,
                        padding: '10px',
                        overflow: 'hidden',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                        //boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.3)',
                        marginBottom: '25px',
                        marginTop: '25px',
                    }}>
                        <Guitar />
                        {/*{instruments[currentInstrument]}*/}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        minHeight: '100px',
                        minWidth: minWidth,
                        backgroundColor: theme === lightColors ? lightColors.bottomDisplayBackground : darkColors.bottomDisplayBackground,
                        padding: '10px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                    }}>
                        <DisplayNotes/>
                        <DetectChord/>
                        <PlayNotes/>
                    </div>

                    {/*<div style={{display: 'flex', flexDirection: 'column', overflow: 'auto'}}>*/}
                    {/*    {user ? (*/}
                    {/*        <div>*/}
                    {/*            <h1>Welcome, {user.email}!</h1>*/}
                    {/*            <button onClick={handleLogout}>Logout</button>*/}

                    {/*            <SaveData user={user} />*/}
                    {/*        </div>*/}
                    {/*    ) : (*/}
                    {/*        <Auth user={user} setUser={setUser}/>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                </div>
        </div>
    );
}

export default ThemedApp;