import React from 'react';

const CommingSoon = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
            <div className="text-center text-white px-6 md:px-12">
                <h1 className="text-5xl font-extrabold leading-tight mb-4">
                    Coming Soon
                </h1>
                <p className="text-xl mb-6">
                    We are working hard to bring something amazing. Stay tuned!
                </p>

                {/* <div className="flex justify-center space-x-4">
                    <a href="#" className="text-white text-3xl hover:text-gray-100 transition duration-300">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="text-white text-3xl hover:text-gray-100 transition duration-300">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-white text-3xl hover:text-gray-100 transition duration-300">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="text-white text-3xl hover:text-gray-100 transition duration-300">
                        <i className="fab fa-youtube"></i>
                    </a>
                </div> */}
            </div>
        </div>
    );
};

export default CommingSoon;
