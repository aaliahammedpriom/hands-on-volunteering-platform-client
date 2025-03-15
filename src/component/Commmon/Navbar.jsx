import React, { useContext, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import AuthContext from '../../provider/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Navbar = () => {
    const { user, loading, hours, minutes, seconds, second, wrokOn, setWorkOn, signOutUser, userPhoto, setUserPhoto } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        useAxiosSecure().get(`/users/${user?.uid}`)
            .then(res => {
                if (res.data.image) {
                    setUserPhoto(res.data.image)
                }
            })
    }, [user])
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        {
            user && <li><NavLink to="/add-post">Add Post</NavLink></li>
        }
        <li><NavLink to="/team">Team</NavLink></li>
        <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
        {
            user && <li><NavLink to="/helprequest">Help Request</NavLink></li>
        }
        <li></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost text-xl">HandsOn</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            {
                !user && location.pathname !== '/signin' && <div className="navbar-end">
                    <NavLink to="/signin" className={'btn'}>Sign In</NavLink>
                </div>
            }
            {
                user && <div className="dropdown dropdown-hover navbar-end">
                    {
                        second > 0 && <div className='flex items-center font-bold it'>
                            <div>Work: {wrokOn}</div>
                            <div>
                                <span className='text-xl '>⏳</span> {String(hours).padStart(2, '0')} h : {String(minutes).padStart(2, '0')} m : {String(seconds).padStart(2, '0')} s
                            </div>
                        </div>
                    }
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">

                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={userPhoto ? userPhoto : "https://w7.pngwing.com/pngs/527/663/png-transparent-logo-person-user-person-icon-rectangle-photography-computer-wallpaper-thumbnail.png"} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <p>{user?.displayName}</p>
                        </li>
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                        <li>
                            <button onClick={() => signOutUser().then(() => navigate('/'))}> SignOut </button>
                        </li>
                    </ul>
                </div>
            }
        </div >
    );
};

export default Navbar;