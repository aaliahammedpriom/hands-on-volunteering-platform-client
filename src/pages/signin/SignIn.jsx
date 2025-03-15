import React, { useContext, useState } from 'react';
import AuthContext from '../../provider/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';

const SignIn = () => {
    const {signInWithEmailAndPass}= useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPass(email, password)
        .then(()=> {
            navigate('/')
            // navigate(from,{replace : true})
        })
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSignIn} className="space-y-4">
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
                        }}
                        required
                        className="input input-bordered w-full"
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full mt-4">
                    Sign Up
                </button>
            </form>
            <div>
                <p>Don't have Account?</p>
                <Link to={'/signup'} className='link text-blue-600 hover:text-blue-400'>SignUp</Link>
            </div>
        </div>
    );
};

export default SignIn;
