import React, {useEffect, useRef, useState} from 'react';
import { IoMdSettings } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import SetScale from "./menuOptions/setScale";
import SetChord from "./menuOptions/setChord";
import UserProfile from "./menuOptions/userProfile";

const Menu = ({isMenuOpen, toggleMenuProp }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('scale');
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        toggleMenuProp();
    };

    const showScale = () => {
        setActiveTab('scale');
    };

    const showChord = () => {
        setActiveTab('chord');
    };

    const showUserProfile = () => {
        setActiveTab('userProfile');
    };

    return (
        <div>
            <button
                onClick={toggleMenu}
                style={{
                    position: 'relative',
                    zIndex: 500,
                    backgroundColor: 'rgba(0, 0, 0, 0.0)',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '40px',
                    height: '40px',
                    pointerEvents: 'auto',
                }}
            >
                <IoMdSettings style={{fontSize: '200%'}}/>
            </button>

            {/* Sliding menu */}
            <div
                ref={menuRef}
                style={{
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    width: '300px',
                    height: '100%',
                    backgroundColor: '#f7f7f7',
                    zIndex: 1000,
                    // paddingTop: '10px',
                    boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.3s ease-in-out',
                }}
            >
                {/* Close button inside the menu */}
                <button
                    onClick={toggleMenu}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.0)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '35px',
                        height: '35px',
                        //backgroundColor: 'red',
                    }}
                >
                    <IoCloseOutline style={{fontSize: '200%'}}/>
                </button>

                {/* Toggle buttons */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    boxShadow: '0px 10px 10px -5px rgba(0, 0, 0, 0.1)',
                    paddingBottom: '10px',
                }}>
                    <button
                        onClick={showScale}
                        style={{
                            //padding: '10px 20px',
                            padding: '5px',
                            cursor: 'pointer',
                            backgroundColor: activeTab === 'scale' ? '#007BFF' : '#cccccc', // Blue if selected, gray if not
                            color: activeTab === 'scale' ? '#fff' : '#333', // White text if selected, dark text if not
                            border: 'none',
                            borderRadius: '5px',
                            marginLeft: '10px',
                            fontSize: '16px',
                            fontWeight: '500',
                            transition: 'background-color 0.3s ease, transform 0.2s ease',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            outline: 'none',
                            flex: 1, // Make buttons take equal width
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Search Scales
                    </button>
                    <button
                        onClick={showChord}
                        style={{
                            //padding: '10px 20px',
                            padding: '5px',
                            cursor: 'pointer',
                            backgroundColor: activeTab === 'chord' ? '#007BFF' : '#cccccc', // Blue if selected, gray if not
                            color: activeTab === 'chord' ? '#fff' : '#333', // White text if selected, dark text if not
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            fontWeight: '500',
                            transition: 'background-color 0.3s ease, transform 0.2s ease',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            outline: 'none',
                            flex: 1, // Make buttons take equal width
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Search Chords
                    </button>
                    <button
                        onClick={showUserProfile}
                        style={{
                            //padding: '10px 20px',
                            padding: '5px',
                            cursor: 'pointer',
                            backgroundColor: activeTab === 'userProfile' ? '#007BFF' : '#cccccc', // Blue if selected, gray if not
                            color: activeTab === 'userProfile' ? '#fff' : '#333', // White text if selected, dark text if not
                            border: 'none',
                            borderRadius: '5px',
                            marginRight: '10px',
                            fontSize: '16px',
                            fontWeight: '500',
                            transition: 'background-color 0.3s ease, transform 0.2s ease',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            outline: 'none',
                            flex: 1, // Make buttons take equal width
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        User Profile
                    </button>
                </div>


                {/* Menu content */}
                <div style={{
                    marginRight: '10px',
                    marginLeft: '10px',
                    marginTop: '10px',
                    //backgroundColor: 'rgba(0, 0, 0, 0.0)',
                    //marginTop: '10px',
                    // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    // borderRadius: '10px',
                }}>
                    {activeTab === 'scale' && <SetScale/>}
                    {activeTab === 'chord' && <SetChord/>}
                    {/*{activeTab === 'userProfile' && <UserProfile />}*/}
                </div>
                <div style={{
                    //overflowX: 'hidden', // Prevent horizontal scrolling
                    //overflowY: 'auto',   // Allow vertical scrolling
                    width: '100%',       // Ensure it doesn't exceed the parent's width
                    boxSizing: 'border-box', // Include padding in width calculations
                    //maxHeight: '100%',   // Ensure it respects the parent's height
                }}>
                    {activeTab === 'userProfile' && <UserProfile/>}
                </div>
            </div>
        </div>
    );
};

export default Menu;
