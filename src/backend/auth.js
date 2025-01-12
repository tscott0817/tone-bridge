import React, { useState, useEffect } from 'react';
import { loginUser, createUser } from './api'; // Assuming you have an API to handle login/signup
import { supabase } from './client'; // Import the supabase client

const Auth = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState(''); // New state for username
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [isSignedUp, setIsSignedUp] = useState(false); // New state to track signup status

    // Check current user on mount
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            console.log('Current user:', user);
            if (user) {
                setUser(user); // Set user if logged in
            }
        };
        checkUser();
    }, [setUser]);

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (!isLogin && password !== confirmPassword) {
                setError('Passwords do not match. Please try again.');
                return;
            }

            let user;
            if (isLogin) {
                user = await loginUser(email, password); // Login
            } else {
                user = await createUser(email, password); // Sign up
                setIsSignedUp(true); // Mark as signed up successfully
            }

            console.log('User data received:', user);
            setUser(user); // Update user state directly
            setError(''); // Clear any previous errors
        } catch (error) {
            setError('Authentication failed. Please check your email if you have already created an account.');
            console.error('Authentication error:', error.message);
        }
    };

    return (
        <div style={{
            marginTop: '10px'
        }}>
            {isSignedUp ? (
                <div>
                    <p>Please check your email for verification.</p>
                </div>
            ) : (
                <>
                    <form onSubmit={handleAuth}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        {!isLogin && (
                            <>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    required
                                />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    required
                                />
                            </>
                        )}
                        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                    </form>
                    <button onClick={() => {
                        setIsLogin(!isLogin);
                        setError(''); // Clear error when switching modes
                    }}>
                        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                    </button>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </>
            )}
        </div>
    );
};

export default Auth;
