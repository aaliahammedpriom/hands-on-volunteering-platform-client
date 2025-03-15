import React, { useContext, useEffect, useState } from "react";
import { Pencil } from "lucide-react"; // Icon for better UI
import AuthContext from "../../provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import EventHistory from "./EventHistory/EventHistory";
import ContributionHistory from "./ContributionHistory/ContributionHistory";
import CommingSoon from "../../component/Commmon/CommingSoon";

const Profile = () => {
    const { user, setUserPhoto } = useContext(AuthContext)
    const [edit, setEdit] = useState(false);
    const [userEvents, setUserEvents] = useState(null);
    const [userContribution, setUserContribution] = useState(null);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        useAxiosSecure().get(`/users/${user?.uid}`)
            .then(res => {
                setFormData({
                    name: res.data?.name,
                    email: res.data?.email,
                    uid: res.data?.uid,
                    image: res.data?.image,
                    skills: res.data?.skills,
                    causes: res.data?.causes,
                    log: res.data?.log
                })
            })

        useAxiosSecure().get(`/events/user/${user?.uid}`)
            .then(res => setUserEvents(res.data))
        useAxiosSecure().get(`/contribution/user/${user?.uid}`)
            .then(res => setUserContribution(res.data))

    }, [user?.uid])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEdit(false);
        setUserPhoto(formData.image)
        useAxiosSecure().patch(`/update/${user.uid}`, formData)
    };

    if (formData) {

        return (
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                {/* Profile Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={formData?.image || "https://w7.pngwing.com/pngs/527/663/png-transparent-logo-person-user-person-icon-rectangle-photography-computer-wallpaper-thumbnail.png"}
                            alt={formData.name}
                            className="w-20 h-20 rounded-full border-2 border-blue-500"
                        />
                        <div>
                            <h2 className="text-2xl font-semibold">{formData.name ? formData.name : <p className="text-red-500">No Name</p>}</h2>
                            <p className="text-gray-500">Email: {formData.email}</p>
                        </div>
                    </div>
                    {/* Edit Button */}
                    <button
                        onClick={() => setEdit(!edit)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                    >
                        {
                            edit ? <span>X</span> : <><Pencil size={18} />
                                <span>Edit</span></>
                        }
                    </button>
                    {/* Points and Certificates */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-lg shadow-md w-64 text-center">
                        <h3 className="text-lg font-semibold">🏆 Achievements</h3>

                        {/* Points Display */}
                        <div className="mt-2 text-xl font-bold">
                            Points: <span className="text-yellow-300">{Math.floor(formData.log / 3600) * 5}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-2 h-2 w-full bg-blue-300 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-yellow-400"
                                style={{ width: `${Math.min((formData.log / 360000) * 100, 100)}%` }} // Max 100%
                            ></div>
                        </div>

                        {/* Certificates */}
                        <div className="mt-3 text-sm">
                            <h4 className="font-semibold">📜 Certificates Earned:</h4>
                            <div className="mt-1 flex flex-wrap justify-center gap-2">
                                {formData.log > 72000 && <span className="bg-green-500 px-3 py-1 rounded-md">20H</span>}
                                {formData.log > 180000 && <span className="bg-yellow-500 px-3 py-1 rounded-md">50H</span>}
                                {formData.log > 359999 && <span className="bg-red-500 px-3 py-1 rounded-md">100H</span>}
                                {formData.log > 360000 && <span className="bg-purple-500 px-3 py-1 rounded-md">200H</span>}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Edit Form or View Profile */}
                {edit ? (
                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="mt-4">
                            <label className="label-text">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Image */}
                        <div className="mt-4">
                            <label className="label-text">Image Link</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Skills */}
                        <div className="mt-4">
                            <label className="label">
                                <span className="label-text">Skills</span>
                            </label>
                            <select
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleInputChange}
                                required
                                className="select select-bordered w-[100%]"
                            >
                                <option value="" disabled>Select your skill</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Teaching">Teaching</option>
                                <option value="Fundraising">Fundraising</option>
                                <option value="Graphic Design">Graphic Design</option>
                                <option value="Project Management">Project Management</option>
                            </select>
                        </div>


                        {/* Causes They Support */}
                        <div className="mt-4">
                            <label className="label">
                                <span className="label-text">Causes You Support</span>
                            </label>
                            <select
                                type="text"
                                name="causes"
                                value={formData.causes}
                                onChange={handleInputChange}
                                required
                                className="select select-bordered w-full"
                            >
                                <option value="" disabled>Select a cause</option>
                                <option value="Environment">Environment</option>
                                <option value="Education">Education</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Animal Welfare">Animal Welfare</option>
                                <option value="Human Rights">Human Rights</option>
                            </select>
                        </div>


                        {/* Save Button */}
                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <>

                        {/* Skills */}
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Skills</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md">
                                    {formData.skills}
                                </span>
                            </div>
                        </div>

                        {/* Causes They Support */}
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Causes They Support</h3>
                            <p className="list-disc list-inside text-gray-600 mt-2">
                                {formData.causes}
                            </p>
                        </div>

                        {/*  History */}
                        <div className="tabs tabs-lift">
                            <input type="radio" name="my_tabs_3" className="tab" aria-label="My Events" defaultChecked />
                            <div className="tab-content bg-base-100 border-base-300 p-6">
                                {
                                    userEvents ? <EventHistory userEvents={userEvents}></EventHistory> : 'No Events'
                                }
                            </div>

                            <input type="radio" name="my_tabs_3" className="tab" aria-label="My Contribution" />
                            <div className="tab-content bg-base-100 border-base-300 p-6">
                                {
                                    userContribution ? <ContributionHistory userContribution={userContribution}></ContributionHistory> : 'No Contribution'
                                }
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }
};

export default Profile;
