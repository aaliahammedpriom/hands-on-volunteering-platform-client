import React, { useContext, useState } from 'react';
import CreateTeam from './CreateTeam/CreateTeam';
import TeamPost from './TeamPost/TeamPost';
import MyTeam from './MyTeam/MyTeam';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import AuthContext from '../../provider/AuthContext';

const Team = () => {
    const [refatch, setRefatch] = useState()
    const { user } = useContext(AuthContext)
    return (
        <div className="tabs tabs-lift">
            <input type="radio" name="my_tabs_3" className="tab" aria-label="Teams" defaultChecked />
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <TeamPost refatch={refatch}></TeamPost>
            </div>
            {
                user && <>
                    <input type="radio" name="my_tabs_3" className="tab" aria-label="Create Team" />
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        <CreateTeam refatch={refatch} setRefatch={setRefatch}></CreateTeam>
                    </div>
                    <input type="radio" name="my_tabs_3" className="tab" aria-label="My Team" />
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        <MyTeam></MyTeam>
                    </div>
                </>
            }

        </div>
    );
};

export default Team;