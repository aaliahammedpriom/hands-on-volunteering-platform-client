import React, { useContext } from "react";
import AuthContext from "../../../provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";


const EventCart = ({ data }) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const onJoin = (id) => {
        if (user) {
            const contribution = {
                email: user.email,
                uid: user.uid,
                eventId: id,
                title: data.title,
                eventDate: data.eventDate,
                location: data.location

            }
            useAxiosSecure().post('/contribution', contribution)
                .then((res) => {
                    if (!res.data.insertedId) {
                        alert('You Already Joined')
                    }
                    if (res.data.insertedId) {
                        alert(' Joined Success')
                    }
                })
        }
        else{
            alert("You need to Signin for this action")
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden transition-all hover:shadow-xl">
            <div className="p-6 h-full flex flex-col justify-between ">
                {/* Event Title */}
                <h2 className="text-2xl font-semibold">{data?.title}</h2>

                {/* Poster Details */}
                <div className="text-sm">
                    <p>👤 <span className="font-medium">{data?.email}</span></p>
                    <p>📅 Posted: {data?.date ? new Date(data.date).toLocaleString() : "N/A"}</p>
                </div>

                {/* Event Description */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">Event Description</h3>
                    <p>
                        {data?.description}
                    </p>
                </div>

                {/* Event Details */}
                <div className="">
                    <p><strong>📍 Location:</strong> {data?.location || "Not specified"}</p>
                    <p><strong>🏷️ Category:</strong> {data?.category || "Not specified"}</p>
                    <p><strong>📅 Event Date:</strong> {data?.eventDate ? data.eventDate.slice(0, 10) : "TBD"}</p>
                    <p><strong>⏰ Event Time:</strong> {data?.eventDate ? data.eventDate.slice(11) : "TBD"}</p>
                </div>

                {/* CTA Button */}
                <div className="mt-4 flex justify-end">
                    {data?.eventDate && new Date(data.eventDate) > new Date() ? (
                        <button
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
                            onClick={() => onJoin(data?._id)}
                        >
                            Join Event 🚀
                        </button>
                    ) : (
                        <button className="w-full py-2 px-4 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed">
                            Unavailable
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCart;
