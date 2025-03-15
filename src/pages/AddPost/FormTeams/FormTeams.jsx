import React, { useState } from "react";
import { useForm } from "react-hook-form";

const FormTeams = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [teams, setTeams] = useState([]);

    const onSubmit = (data) => {
        const newTeam = { ...data, id: Date.now(), members: [] };
        setTeams([...teams, newTeam]);
        console.log("New Team Created:", newTeam);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">Create a Team</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Team Name */}
                <div>
                    <label className="block font-medium">Team Name</label>
                    <input 
                        type="text" 
                        {...register("name", { required: "Team name is required" })} 
                        className="input input-bordered w-full mt-1" 
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea 
                        {...register("description", { required: "Description is required" })} 
                        className="textarea textarea-bordered w-full mt-1" 
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Team Privacy */}
                <div>
                    <label className="block font-medium">Privacy</label>
                    <select 
                        {...register("privacy", { required: "Please select a privacy type" })} 
                        className="select select-bordered w-full mt-1"
                    >
                        <option value="">Select Privacy Type</option>
                        <option value="public">Public (Anyone can join)</option>
                        <option value="private">Private (Invite only)</option>
                    </select>
                    {errors.privacy && <p className="text-red-500 text-sm">{errors.privacy.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full">
                    Create Team
                </button>
            </form>

            {/* Display Created Teams */}
            {teams.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold">Teams Created</h3>
                    <div className="space-y-4 mt-3">
                        {teams.map((team) => (
                            <div key={team.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold">{team.name}</h4>
                                <p className="text-sm">{team.description}</p>
                                <span className={`badge ${team.privacy === "private" ? "badge-error" : "badge-success"}`}>
                                    {team.privacy === "private" ? "Private Team" : "Public Team"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormTeams;
