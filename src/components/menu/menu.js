import React, { useState } from 'react';
import { IoMdSettings } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import SetScale from "./menuOptions/setScale";
import SetChord from "./menuOptions/setChord";
import UserProfile from "./menuOptions/userProfile"; // Import UserProfile component
import SaveData from "./menuOptions/saveData";
import Auth from "../../backend/auth";
import { logoutUser } from "../../backend/api";
import { supabase } from "../../backend/client";

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('scale'); // Track the active tab

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const showScale = () => {
        setActiveTab('scale'); // Set the active tab to 'scale'
    };

    const showChord = () => {
        setActiveTab('chord'); // Set the active tab to 'chord'
    };

    const showUserProfile = () => {
        setActiveTab('userProfile'); // Set the active tab to 'userProfile'
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
                    pointerEvents: isOpen ? 'none' : 'auto',
                }}
            >
                {isOpen ? <IoMdSettings style={{ fontSize: '200%' }} /> : <IoMdSettings style={{ fontSize: '200%' }} />}
            </button>

            {/* Sliding menu */}
            <div
                style={{
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    width: '300px',
                    height: '100%',
                    backgroundColor: '#f7f7f7',
                    zIndex: 1000,
                    padding: '10px',
                    boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    gap: '10px',
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
                        width: '30px',
                        height: '30px',
                    }}
                >
                    <IoCloseOutline style={{ fontSize: '200%' }} />
                </button>

                {/* Toggle buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button
                        onClick={showScale}
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            backgroundColor: activeTab === 'scale' ? 'lightblue' : 'transparent',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    >
                        Scales
                    </button>
                    <button
                        onClick={showChord}
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            backgroundColor: activeTab === 'chord' ? 'lightblue' : 'transparent',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    >
                        Chords
                    </button>
                    <button
                        onClick={showUserProfile}
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            backgroundColor: activeTab === 'userProfile' ? 'lightblue' : 'transparent',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    >
                        User Profile
                    </button>
                </div>

                {/* Menu content */}
                {activeTab === 'scale' && <SetScale />}
                {activeTab === 'chord' && <SetChord />}
                {activeTab === 'userProfile' && <UserProfile />}
            </div>
        </div>
    );
};

export default Menu;




// import React, {useEffect, useState} from 'react';
// import { IoMdSettings } from "react-icons/io";
// import { IoCloseOutline } from "react-icons/io5";
// import SetScale from "./menuOptions/setScale";
// import SetChord from "./menuOptions/setChord";
// import UserProfile from "./menuOptions/userProfile";
// import SaveData from "./menuOptions/saveData";
// import Auth from "../../backend/auth";
// import {logoutUser} from "../../backend/api";
// import {supabase} from "../../backend/client";
//
// const Menu = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isScaleVisible, setIsScaleVisible] = useState(true); // State to toggle between SetScale and SetChord
//
//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };
//
//     const showScale = () => {
//         setIsScaleVisible(true); // Show SetScale
//     };
//
//     const showChord = () => {
//         setIsScaleVisible(false); // Show SetChord
//     };
//
//     return (
//         <div>
//             <button
//                 onClick={toggleMenu}
//                 style={{
//                     position: 'relative',
//                     zIndex: 500,
//                     backgroundColor: 'rgba(0, 0, 0, 0.0)',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     width: '40px',
//                     height: '40px',
//                     pointerEvents: isOpen ? 'none' : 'auto',
//                 }}
//             >
//                 {isOpen ? <IoMdSettings style={{fontSize: '200%'}}/> : <IoMdSettings style={{fontSize: '200%'}}/>}
//             </button>
//
//             {/* Sliding menu */}
//             <div
//                 style={{
//                     position: 'fixed',
//                     top: '0',
//                     right: '0',
//                     width: '300px',
//                     height: '100%',
//                     backgroundColor: '#f7f7f7',
//                     zIndex: 1000,
//                     padding: '10px',
//                     // boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.5)',
//                     boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.25)',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'flex-start',
//                     gap: '10px',
//                     transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
//                     transition: 'transform 0.3s ease-in-out',
//                 }}
//             >
//                 {/* Close button inside the menu */}
//                 <button
//                     onClick={toggleMenu}
//                     style={{
//                         backgroundColor: 'rgba(0, 0, 0, 0.0)',
//                         border: 'none',
//                         // borderRadius: '5px',
//                         cursor: 'pointer',
//                         // boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
//                         display: 'flex',
//                         justifyContent: 'center',  // Centers horizontally
//                         alignItems: 'center',      // Centers vertically
//                         width: '30px',             // Set a fixed width for the button
//                         height: '30px',            // Set a fixed height for the button
//                     }}
//                 >
//                     <IoCloseOutline style={{fontSize: '200%'}}/>
//                 </button>
//
//                 {/* Toggle buttons */}
//                 <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
//                     <button
//                         onClick={showScale}
//                         style={{
//                             padding: '10px',
//                             cursor: 'pointer',
//                             backgroundColor: isScaleVisible ? 'lightblue' : 'transparent',
//                             border: '1px solid #ccc',
//                             borderRadius: '5px',
//                         }}
//                     >
//                         Scales
//                     </button>
//                     <button
//                         onClick={showChord}
//                         style={{
//                             padding: '10px',
//                             cursor: 'pointer',
//                             backgroundColor: !isScaleVisible ? 'lightblue' : 'transparent',
//                             border: '1px solid #ccc',
//                             borderRadius: '5px',
//                         }}
//                     >
//                         Chords
//                     </button>
//                 </div>
//
//                 {/* Menu content */}
//                 {isScaleVisible ? <SetScale/> : <SetChord/>}
//             </div>
//         </div>
//     );
// };
//
// export default Menu;
