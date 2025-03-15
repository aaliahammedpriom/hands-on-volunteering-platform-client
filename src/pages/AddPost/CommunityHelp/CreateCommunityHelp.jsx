import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../../provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const CreateCommunityHelp = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate =useNavigate()


    const onSubmit = (data) => {
        const communityHelp = {
            ...data,
            uid: user.uid,
            email: user.email,
            date: new Date().toUTCString()
        }
        useAxiosSecure().post('/communityhelp', communityHelp)
            .then(res => {
                if(res.data.insertedId)(
                    navigate('/')
                )
            })
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold mb-4">Create Community Help</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block font-medium">Title</label>
                    <input

                        type="text"
                        {...register("title", { required: "Title is required" })}
                        maxLength={50}
                        className="input input-bordered w-full mt-1"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>
                {/* Event */}
                <div>
                    <label className="block font-medium">Event Date</label>
                    <input
                        type="datetime-local"
                        {...register("eventDate", { required: "Date is required" })}
                        className="input input-bordered w-full mt-1"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        maxLength={200}
                        className="textarea textarea-bordered w-full mt-1"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Location */}
                <div>
                    <label className="block font-medium">Location</label>
                    <input
                        type="text"
                        {...register("location", { required: "Location is required" })}
                        maxLength={50}
                        className="input input-bordered w-full mt-1"
                    />
                    {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                </div>

                {/* Urgency Level */}
                <div>
                    <label className="block font-medium">Urgency Level</label>
                    <select
                        {...register("urgency", { required: "Urgency level is required" })}
                        className="select select-bordered w-full mt-1"
                    >
                        <option value="">Select Urgency</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="urgent">Urgent</option>
                    </select>
                    {errors.urgency && <p className="text-red-500 text-sm">{errors.urgency.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateCommunityHelp;
