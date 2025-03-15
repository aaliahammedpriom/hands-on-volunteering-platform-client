import React, { useContext } from "react";
import { Link } from "react-router";
import AuthContext from "../../../provider/AuthContext";

const TeamPostCart = ({ data }) => {
    const { user } = useContext(AuthContext)
    return (
        <div className="card w-full bg-base-100 shadow-xl border border-gray-200">
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">{data.teamName}</h2>
                <p className="text-gray-600">{data.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="badge badge-primary">{data.membership}</span>
                    {
                        user ? <Link to={`/team/${data._id}`} className="btn btn-outline btn-primary">Join</Link> : <Link to={`/signin`} className="btn btn-outline btn-primary">Sign In to Join</Link>
                    }
                </div>
                <p className="text-xs text-gray-400">Created on: {new Date(data.createDate).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default TeamPostCart;
