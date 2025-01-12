import React, { useEffect, useState } from "react";
import { useNoteContext } from "../../../stateManager/NoteContext"; // Import the NoteContext
import { Scale, ScaleType } from 'tonal';
import SaveData from "./saveData";
import Auth from "../../../backend/auth";
import {logoutUser} from "../../../backend/api";
import {supabase} from "../../../backend/client";

const UserProfile = () => {

    const [user, setUser] = useState(null);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();

        const handleBeforeUnload = async (event) => {
            if (user) {
                await handleLogout();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [user]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '100%',
            }}
        >
            {user ? (
                <div>
                    <p style={{
                        wordWrap: 'break-word',
                        fontSize: '20px',
                        //backgroundColor: 'red',
                        marginBottom: '5px',
                        marginTop: '0px'
                    }}>
                        Logged in as: {user.email}
                    </p>
                    <button onClick={handleLogout} style={{

                    }}>
                        Logout
                    </button>
                    <div style={{

                    }}>
                        <SaveData user={user}/>
                    </div>
                </div>
            ) : (
                <Auth user={user} setUser={setUser}/>
            )}
        </div>
    );
};

export default UserProfile;
