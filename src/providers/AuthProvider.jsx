import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isTokenSet, setIsTokenSet ] = useState(false);
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleLogin = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if(currentUser){
                setUser(currentUser);
                if(localStorage.getItem('access token')){
                    setIsTokenSet(true);
                }
                setIsLoading(false);
            }else{
                setUser(null);
                localStorage.removeItem('access token');
                setIsTokenSet(false);
                setIsLoading(false);
            }
            return () => unsubscribe();
        })
    }, [user]);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (name, image) => {
        return updateProfile(auth.currentUser, {displayName: name, photoURL: image});
    };

    const logIn = ( email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    };

    const authData = {
        user,
        setUser,
        isLoading,
        handleGoogleLogin,
        signUp,
        updateUser,
        logIn,
        logOut,
        isTokenSet,
        setIsTokenSet
    }
    return (
        <AuthContext.Provider value={authData}>
            { children }
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthProvider;
