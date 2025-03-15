import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import auth from '../firebase/Firebasse.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [refetch, setRefetch] = useState()
    const [loading, setLoading] = useState(true)
    const [userPhoto, setUserPhoto] = useState(null)




    const [logHour, setLogHour] = useState(false);
    const [wrokOn, setWorkOn] = useState('')
    const [second, setSecond] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    useEffect(() => {
        let counter;
        if (logHour) {
            // Start the timer when logHour is true
            counter = setInterval(() => {
                setSecond((second) => second + 1);
                setSeconds((seconds) => seconds + 1);


            }, 1000);
        } else {
            // Clear the interval when logHour is false
            clearInterval(counter);
        }

        // Cleanup the interval when the component unmounts or when logHour changes
        return () => clearInterval(counter);
    }, [logHour]);
    if (seconds > 59) {
        setSeconds(0)
        setMinutes((minutes) => minutes + 1)
    }
    if (minutes > 59) {
        setMinutes(0)
        setHours((hours) => hours + 1)
    }







    const createUserWithEmailAndPass = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    const signInWithEmailAndPass = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass)
    }
    const signOutUser = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                //store token
                useAxiosPublic().post('/jwt', currentUser)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access_token', res.data.token)
                            setUser(currentUser);
                            setLoading(false)
                        }
                    })
            }
            else {
                // remove token
                localStorage.removeItem('access_token')
                setUser(currentUser);
                setLoading(false)
            }
        })
        return () => {
            return unsubscribe();
        }

    }, [])

    const authInfo = {
        user,
        loading,
        refetch, setRefetch,
        wrokOn, setWorkOn,
        logHour, setLogHour,
        second, setSecond,
        seconds, setSeconds,
        minutes, setMinutes,
        hours, setHours,
        userPhoto, setUserPhoto,
        createUserWithEmailAndPass,
        signInWithEmailAndPass,
        signOutUser,
        updateUserProfile,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;