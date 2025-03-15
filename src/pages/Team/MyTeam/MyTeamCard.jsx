import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyTeamCard = ({ data }) => {
    const [src, setSrc] = useState('')
    const [email, setEmail] = useState('')
    const [invite, setInvite] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        useAxiosSecure().get(`/user/${email}`)
            .then(res => {
                if (res.data.email !== email) {
                    return alert("Please add Valid user")
                }
                else {
                    const addMember = {
                        id: data._id,
                        email: res.data.email,
                        uid: res.data.uid,
                        permission: "done"
                    }
                    useAxiosSecure().patch(`/teamrequest`, addMember)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.insertedId) {
                                return alert("Invitation done")
                            }
                            if (res.data.matchedCount === 1 && res.data.modifiedCount === 0 && res.data.upsertedCount === 0) {
                                return alert("Already A Member")
                            }
                        })
                }
            })
    }

    useEffect(() => {
        if (email.length >= 2) {
            useAxiosSecure().get(`/users?src=${email}`)
                .then(res => {
                    setSrc(res.data)
                })
        }
        else{
            setSrc()
        }
    }, [email])
    return (
        <div className="w-full  max-w-5xl mx-auto">
            {/* Banner Section */}
            <div
                className="relative w-full h-48 bg-center rounded-lg"
                style={{ backgroundImage: `url('https://as2.ftcdn.net/v2/jpg/10/30/38/65/1000_F_1030386570_LEaxufMEgGR4JqSoAoP4hluR6LkZ34mJ.jpg')` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div> {/* Dark Overlay */}

                <div className="absolute bottom-[-40px] left-6 flex items-center space-x-4">
                    {/* Profile Image Container */}
                    <div className="w-40 h-20 border-blue-500 border-4 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                        <img
                            src="https://as2.ftcdn.net/v2/jpg/10/30/38/65/1000_F_1030386570_LEaxufMEgGR4JqSoAoP4hluR6LkZ34mJ.jpg"
                            alt="Team Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>


            {/* Content Section */}
            <div className="mt-16 p-6 bg-base-100 shadow-lg rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800"> {data.teamName}</h2>
                <p className="text-gray-600 mt-2">{data.description}</p>

                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        Created by: <span className="font-medium">{data.email}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                        Created on: {new Date(data.createDate).toLocaleDateString()}
                    </p>
                </div>

                {/* Actions Section */}
                <div className="mt-6">
                    {invite ? (
                        <div>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col sm:flex-row items-center gap-2 mt-4"
                            >
                                <input
                                    type="email"
                                    placeholder="Enter email to invite..."
                                    className="input input-bordered w-full max-w-sm"
                                    value={email}
                                    // onBlur={()=>setSrc('')}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn btn-success">Submit</button>
                                <button type="button" className="btn btn-error" onClick={() => setInvite(false)}>Cancel</button>
                            </form>
                            {
                                src && src.map(data => <li key={data._id}><button onClick={() => setEmail(data.email)} >{data.email}</button></li>)
                            }
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <button className="btn btn-primary">Join Discussion</button>
                            <button onClick={() => setInvite(true)} className="btn btn-outline">Invite Members</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyTeamCard;