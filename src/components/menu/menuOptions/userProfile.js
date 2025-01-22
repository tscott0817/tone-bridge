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
                height: '100%',
                //backgroundColor: 'blue'
            }}
        >
            {user ? (
                <div style={{
                    //backgroundColor: 'green',
                    height: '100%',
                    position: 'relative',
                }}>
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
                        width: '90%',
                        //padding: '2px'
                    }}>
                        Logout
                    </button>
                    <div style={{
                        //backgroundColor: 'rebeccapurple',
                        position: 'absolute',
                        top: '80px',
                        bottom: '0',
                        //height: '80%',
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
