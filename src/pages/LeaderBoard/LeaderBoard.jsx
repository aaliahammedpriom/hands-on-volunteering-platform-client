import React from 'react';
import VolunteerRank from './ValunteerRank/VolunteerRank';
import TeamRank from './TeamRank/TeamRank';

const LeaderBoard = () => {
    return (
        <div className="tabs tabs-lift">
            <input type="radio" name="my_tabs_3" className="tab" aria-label="Teams Rank" defaultChecked />
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <TeamRank></TeamRank>
            </div>

            <input type="radio" name="my_tabs_3" className="tab" aria-label="Valunteer Rank" />
            <div className="tab-content bg-base-100 border-base-300 p-6">
               <VolunteerRank></VolunteerRank>

            </div>


        </div>
    );
};

export default LeaderBoard;