// backend/api.js

import { supabase } from './client';

// User creation and authentication
export const createUser = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    console.log('createUser response:', { user, error });

    if (error) throw new Error(error.message);

    // Get the session after creating the user
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    console.log('Session after user creation:', { session, sessionError });

    return user;
};

export const loginUser = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log('loginUser response:', { user, error });

    if (error) throw new Error(error.message);

    // Get the session after login
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    console.log('Session after login:', { session, sessionError });

    return user;
};

export const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    console.log('User logged out');
};

// CRUD Operations for Scales and Chords (with user association)
export const createScaleOrChord = async (userId, name, type, data) => {
    const { data: result, error } = await supabase
        .from('user_saved_data')
        .insert([{ user_id: userId, name, type, data }]); // Store with user ID
    if (error) throw new Error(error.message);
    return result;
};

export const getScalesAndChords = async (userId) => {
    const { data, error } = await supabase
        .from('user_saved_data')
        .select('*')
        .eq('user_id', userId) // Only fetch for the logged-in user
        .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
};

export const updateScaleOrChord = async (id, updates) => {
    const { data, error } = await supabase
        .from('user_saved_data')
        .update(updates)
        .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
};

export const deleteScaleOrChord = async (id) => {
    const { data, error } = await supabase
        .from('user_saved_data')
        .delete()
        .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
};
