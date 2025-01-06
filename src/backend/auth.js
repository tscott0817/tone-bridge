import React, { useState, useEffect } from 'react';
import { loginUser, createUser } from './api'; // Assuming you have an API to handle login/signup
import { supabase } from './client'; // Import the supabase client

const Auth = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

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
            let user;
            if (isLogin) {
                user = await loginUser(email, password); // Login
            } else {
                user = await createUser(email, password); // Sign up
            }

            console.log('User data received:', user);
            setUser(user); // Update user state directly
            setError(''); // Clear any previous errors
        } catch (error) {
            setError('Authentication failed. Please try again.');
            console.error('Authentication error:', error.message);
        }
    };

    return (
        <div>
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
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

// const Auth = ({ setUser }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLogin, setIsLogin] = useState(true);
//     const [error, setError] = useState('');
//
//     // Check current user on mount
//     useEffect(() => {
//         const checkUser = async () => {
//             const { data: { user } } = await supabase.auth.getUser();
//             console.log('Current user:', user);
//             if (user) {
//                 setUser(user);
//             }
//         };
//         checkUser();
//     }, [setUser]);
//
//     const handleAuth = async (e) => {
//         e.preventDefault();
//         try {
//             let user;
//             if (isLogin) {
//                 user = await loginUser(email, password);
//             } else {
//                 user = await createUser(email, password);
//             }
//
//             console.log('User data received:', user);
//             setUser(user);
//             setError('');
//
//             // Force a full page refresh after successful login/signup
//             window.location.reload();  // This will refresh the page
//         } catch (error) {
//             setError('Authentication failed. Please try again.');
//             console.error('Authentication error:', error.message);
//         }
//     };
//
//     return (
//         <div>
//             <form onSubmit={handleAuth}>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     required
//                 />
//                 <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
//             </form>
//             <button onClick={() => setIsLogin(!isLogin)}>
//                 {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
//             </button>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//         </div>
//     );
// };

export default Auth;

