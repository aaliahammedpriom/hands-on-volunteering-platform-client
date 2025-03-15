import React, { useContext, useState } from "react";
import AuthContext from "../../../provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";


const CommunityHelpCard = ({ data }) => {
    const [isMassage, setIsMassage] = useState(false)
    const { user } = useContext(AuthContext)
    const sendMessage = (e) => {
        e.preventDefault()
        if (user && user?.email) {

            const message = {
                email: user.email,
                creatorEmail: data.email,
                creatorUid: data.uid,
                uid: user.uid,
                title: data.title,
                eventId: data._id,
                message: e.target.message.value

            }
            useAxiosSecure().post('/communityhelpmessage', message)
                .then((res) => {
                    if (!res.data.insertedId) {
                        alert('You Already Message')
                    }
                    if (res.data.insertedId) {

                        alert(' Sent Success')
                    }
                    setIsMassage(false)
                })
        }
        else {
            alert("You need to Signin for this action")
            setIsMassage(false)

        }
    };

    return (

        !isMassage ? <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden transition-all hover:shadow-xl">
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
                    <p><strong>🏷️ Urgency:</strong> {data?.urgency || "Not specified"}</p>
                    <p><strong>📅 Event Date:</strong> {data?.eventDate ? data.eventDate.slice(0, 10) : "TBD"}</p>
                    <p><strong>⏰ Event Time:</strong> {data?.eventDate ? data.eventDate.slice(11) : "TBD"}</p>
                </div>

                {/* CTA Button */}
                <div className="mt-4 flex justify-end">
                    {data?.eventDate && new Date(data.eventDate) > new Date() ? (
                        <button
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
                            onClick={() => setIsMassage(true)}
                        >
                            Massage
                        </button>
                    ) : (
                        <button className="w-full py-2 px-4 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed">
                            Unavailable
                        </button>
                    )}
                </div>
            </div>
        </div> :
            // message box
            <div className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-md ">
                <h2 className="text-2xl font-semibold mb-6">Leave Your Messaage</h2>
                <form onSubmit={sendMessage} className="flex flex-col justify-between">
                    <div className="mb-4">
                        {/* <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label> */}
                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            maxLength={200}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Your Message"
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-between">
                        <button onClick={() => setIsMassage(false)} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">Cencel</button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>

    );
};

export default CommunityHelpCard;
