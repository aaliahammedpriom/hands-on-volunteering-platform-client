import React, { useContext, useState } from 'react';
import AuthContext from '../../provider/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const SignUp = () => {
    const { user, createUserWithEmailAndPass, updateUserProfile } = useContext(AuthContext)
    const axiosSecure =useAxiosSecure()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [skills, setSkills] = useState('');
    const [causes, setCauses] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleSignUp = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            createUserWithEmailAndPass(email, password)
                .then(res => {
                    if (res?.user) {
                        const userData = { email, uid: res.user.uid, skills, causes , log : 0 };
                        axiosSecure.post('/users', userData)
                    }
                    navigate('/')
                })
        }
        else (
            setError('Password not matched')
        )
    };
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input input-bordered w-full"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError('')
                        }}
                        required
                        className="input input-bordered w-full"
                        placeholder="Enter your password"
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            setError('')
                        }}
                        required
                        className="input input-bordered w-full"
                        placeholder="Enter your password"
                    />
                </div>
                {error === 'Password not matched' && <div className='text-red-500'>Password not matched</div>}
                <div>
                    <label className="label">
                        <span className="label-text">Skills</span>
                    </label>
                    <select
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        required
                        className="select select-bordered w-full"
                    >
                        <option value="" disabled>Select your skill</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Teaching">Teaching</option>
                        <option value="Fundraising">Fundraising</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Project Management">Project Management</option>
                    </select>
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Causes You Support</span>
                    </label>
                    <select
                        value={causes}
                        onChange={(e) => setCauses(e.target.value)}
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
                <button type="submit" className="btn btn-primary w-full mt-4">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
