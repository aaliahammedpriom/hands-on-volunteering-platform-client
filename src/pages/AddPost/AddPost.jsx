import React from 'react';
import CreateEvent from './CreateEvent/CreateEvent';
import CreateCommunityHelp from './CommunityHelp/CreateCommunityHelp';

const AddPost = () => {
    return (
        <div className="tabs tabs-lift">
            <input type="radio" name="my_tabs_3" className="tab" aria-label="Create Event" defaultChecked/>
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <CreateEvent></CreateEvent>
            </div>

            <input type="radio" name="my_tabs_3" className="tab" aria-label="Create CommunityHelp"  />
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <CreateCommunityHelp></CreateCommunityHelp>
            </div>
        </div>
    );
};

export default AddPost;