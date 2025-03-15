import React from 'react';
import Events from './Events/Events';
import CommunityHelp from './CommunityHelp/CommunityHelp';
const Home = () => {
    return (
        <div className="tabs tabs-lift">
            <input type="radio" name="my_tabs_3" className="tab" aria-label="Create Event" defaultChecked/>
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <Events></Events>
            </div>

            <input type="radio" name="my_tabs_3" className="tab" aria-label="CommunityHelp"  />
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <CommunityHelp></CommunityHelp>
            </div>
        </div>
    );
};

export default Home;