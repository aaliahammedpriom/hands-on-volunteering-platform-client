import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../../../component/Commmon/Spinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../provider/AuthContext";
import PermissionDenied from "./PermissionDenied";
import RequestForPermission from "./RequestForPermission";
import LogHour from "./LogHour/LogHour";

const TeamDetails = () => {
    const { user, refetch, setRefetch } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [members, setMembers] = useState([]);
    const [seeMembers, setSeeMembers] = useState(false);
    const [seePostContent, setSeePostContent] = useState(false)
    const [postContent, setPostContent] = useState("");
    const [discussions, setDiscussions] = useState([]);
    const params = useParams();

    const permissionData = {
        id: params.id,
        email: user.email,
        uid: user.uid
    };

    useEffect(() => {
        useAxiosSecure().get(`/teamdetails?id=${params.id}&&email=${user.email}&&uid=${user.uid}`)
            .then((res) => {
                setData(res.data);
                useAxiosSecure().get(`/teamrequest/${params.id}`)
                    .then((res) => {
                        setMembers(res.data)
                        useAxiosSecure().get(`/teamdiscussion/${params.id}`)
                            .then(res => setDiscussions(res.data))
                    });
            });
    }, [refetch]);

    const submitPost = () => {
        const post = {
            content: postContent,
            email: user.email,
            uid: user.uid,
            id: data._id
        };
        useAxiosSecure().post(`/teamdiscussion`, post)
            .then(res => {
                if (res.data.insertedId) {
                    alert("post success")
                    setPostContent("");
                    setSeePostContent(!seePostContent)
                    setRefetch(!refetch)
                }
            })
    };
    if (!data && !members) {
        return <Spinner />;
    }
    if (data === "Permission Denied") {
        return <PermissionDenied permissionData={permissionData} />;
    }
    if (data === "Request Send For Permission") {
        return <RequestForPermission />;
    }
    if (data && members) {
        return (
            <div className="w-full max-w-5xl mx-auto">
                {/* Banner Section */}
                <div className="relative w-full h-48 bg-center rounded-lg"
                    style={{ backgroundImage: `url('https://as2.ftcdn.net/v2/jpg/10/30/38/65/1000_F_1030386570_LEaxufMEgGR4JqSoAoP4hluR6LkZ34mJ.jpg')` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
                    <div className="absolute bottom-[-40px] left-6 flex items-center space-x-4">
                        <div className="w-40 h-20 border-blue-500 border-4 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                            <img src="https://as2.ftcdn.net/v2/jpg/10/30/38/65/1000_F_1030386570_LEaxufMEgGR4JqSoAoP4hluR6LkZ34mJ.jpg"
                                alt="Team Logo" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="mt-16 p-6 bg-base-100 shadow-lg rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">{data.teamName}</h2>
                    <p className="text-gray-600 mt-2">{data.description}</p>

                    <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm">
                            Achivement: <span className="font-medium">Comming soon</span>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Created by: <span className="font-medium">{data.email}</span>
                        </p>
                        <p className="text-xs text-gray-400">
                            Created on: {new Date(data.createDate).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Members Section */}
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200">
                        <button
                            onClick={() => setSeeMembers(!seeMembers)}
                            className="text-lg font-semibold text-gray-800 flex items-center gap-2"
                        >
                            {seeMembers ? 'Hide Members' : 'See Members'}
                            <span className={`transition-transform ${seeMembers ? 'rotate-180' : 'rotate-0'}`}>▼</span>
                        </button>

                        {seeMembers && (
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {members.map(member => (
                                    <div
                                        key={member._id}
                                        className="flex items-center gap-3 p-3 bg-white shadow-md rounded-lg border border-gray-300 hover:shadow-lg transition duration-300"
                                    >
                                        <p className="text-sm text-gray-500">{member.email}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Post Event Section */}
                    {
                        seePostContent && <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Create a Event</h3>
                            <textarea
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4"
                                placeholder="Share something with your team..."
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                            ></textarea>
                            <button
                                onClick={submitPost}
                                disabled={!postContent.trim()}
                                className="btn btn-primary mt-2 disabled:opacity-50"
                            >
                                Submit
                            </button>
                        </div>
                    }

                    {/* Actions Section */}
                    <div className="mt-6 flex justify-between pr-10 ">
                        <div>
                            <button onClick={() => setSeePostContent(!seePostContent)} className="btn btn-primary">{seePostContent ? 'HIDE' : 'New Event'}</button>
                        </div>
                        <div>
                            <LogHour teamName={data.teamName}></LogHour>
                        </div>
                    </div>

                    {/* All Discussions Section */}
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Team Events</h3>
                        {discussions.length > 0 ? (
                            discussions.map((discussion) => (
                                <div
                                    key={discussion._id}
                                    className="p-4 bg-white shadow-md rounded-lg border border-gray-300 mb-2"
                                >
                                    <p className="text-gray-700 text-2xl font-semibold">{discussion.content}</p>
                                    <p className="text-sm text-gray-500 mt-1">Event by: {discussion.email}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No Event yet. Be the first!</p>
                        )}
                    </div>

                </div>
            </div>
        );
    }
};

export default TeamDetails;
