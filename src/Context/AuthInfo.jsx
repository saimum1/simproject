import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: {
                    userId: action.payload.userId,
                    email: action.payload.email,
                    role: action.payload.role,
                    token: action.payload.token
                },
                token: action.payload.token,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: JSON.parse(localStorage.getItem('userData')) || null,
        token: localStorage.getItem('accessToken') || null,
    });

    console.log('Initial state:', state); // Add this line

    const login = (userData, tokenData) => {
        dispatch({
            type: LOGIN,
            payload: {
                userId: userData.id,
                email: userData.email,
                role: userData.role,
                token: tokenData,
            },
        });
        localStorage.setItem('accessToken', tokenData);
        localStorage.setItem('userData', JSON.stringify({ userId: userData.id, email: userData.email, role: userData.role }));
        console.log('Login state:', state); // Add this line
    };

    const logout = () => {
        dispatch({ type: LOGOUT });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        console.log('Logout state:', state); // Add this line
    };

    const checkTokenExpiration = () => {
        const storedToken = localStorage.getItem('accessToken') || null;
        const storedUserData = JSON.parse(localStorage.getItem('userData')) || null;

        if (storedToken && storedUserData) {
            try {
                const decodedToken = jwtDecode(storedToken);
                const currentTimestamp = Math.floor(Date.now() / 1000);
                if (
                    decodedToken.exp &&
                    decodedToken.exp > currentTimestamp &&
                    decodedToken.userId &&
                    decodedToken.email &&
                    decodedToken.role
                ) {
                    dispatch({
                        type: LOGIN,
                        payload: {
                            userId: storedUserData.userId,
                            email: storedUserData.email,
                            role: storedUserData.role,
                            token: storedToken,
                        },
                    });
                } else {
                    dispatch({ type: LOGOUT });
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                dispatch({ type: LOGOUT });
            }
        }
    };

    useEffect(() => {
        checkTokenExpiration();
        // Call checkTokenExpiration at regular intervals or on user interaction
    }, []);

    const contextValue = {
        ...state,
        login,
        logout,
        user: state.user || null,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
    return useContext(AuthContext);
};