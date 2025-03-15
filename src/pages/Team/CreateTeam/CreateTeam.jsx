import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../provider/AuthContext";
import { useNavigate } from "react-router";


const CreateTeam = ({ refatch, setRefatch }) => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate =useNavigate()


    const onSubmit = (data) => {
        const team = {
            ...data,
            uid: user.uid,
            email: user.email,
            post: 0,
            createDate: new Date().toUTCString()
        }
        useAxiosSecure().post('/team', team)
            .then(res => {
                if (res.data.insertedId) {
                    setRefatch(!refatch)
                    navigate('/')
                }
            })
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold mb-4">Create Team</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Team Name */}
                <div>
                    <label className="block font-medium">Team Name</label>
                    <input

                        type="text"
                        {...register("teamName", { required: "Team Name is required" })}
                        maxLength={50}
                        className="input input-bordered w-full mt-1"
                    />
                    {errors.teamName && <p className="text-red-500 text-sm">{errors.teamName.message}</p>}
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


                {/* Select Membership */}
                <div>
                    <label className="block font-medium">Select Membership</label>
                    <select
                        {...register("membership", { required: "Membership type is required" })}
                        className="select select-bordered w-full mt-1"
                    >
                        <option value="">Select Membership</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    {errors.membership && <p className="text-red-500 text-sm">{errors.membership.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateTeam;