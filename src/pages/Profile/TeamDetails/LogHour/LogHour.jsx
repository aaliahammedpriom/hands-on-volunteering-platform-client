import React, { useState, useEffect, useContext } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import AuthContext from '../../../../provider/AuthContext';

const LogHour = ({ teamName }) => {
    const { user, logHour, setLogHour, second, setSecond, setSeconds, setMinutes, setHours, setWorkOn
    } = useContext(AuthContext)

    const submitLogs = () => {
        const updateLog = {
            email: user.email,
            uid: user.uid,
            log: second
        }
        useAxiosSecure().patch('/users/log', updateLog)
        setLogHour(false)
        setWorkOn("")
        setSecond(0)
        setSeconds(0)
        setMinutes(0)
        setHours(0)
    }
    return (
        <div className="flex items-center gap-2">
            {
                !logHour && <button onClick={() => {
                    setLogHour(true)
                    setWorkOn(teamName)
                }} className="btn">Log Hour</button>
            }
            {
                logHour && <button onClick={() => setLogHour(false)} className="btn">Pause Log</button>
            }
            {
                second > 0 && <button onClick={submitLogs} className='btn'>Submit</button>
            }
        </div>
    );
};

export default LogHour;
