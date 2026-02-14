import React from 'react';
import { Link } from 'react-router';
import { FaGhost, FaHouse, FaArrowLeft } from 'react-icons/fa6';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 font-sans relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />

      <div className="max-w-lg w-full text-center relative z-10">
        <div className="mb-8 relative inline-block">
          <div className="text-[10rem] font-black text-base-content/5 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-base-100 rounded-full shadow-2xl flex items-center justify-center animate-bounce">
              <FaGhost className="text-6xl text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-black mb-4 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-lg text-base-content/60 mb-10 max-w-sm mx-auto leading-relaxed">
          Oops! It seems like this page has gone missing or you've ventured too far into the unknown.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => window.history.back()} className="btn btn-outline btn-lg rounded-2xl gap-3 normal-case border-2 border-base-300 hover:border-base-content hover:bg-base-content hover:text-base-100 font-bold">
            <FaArrowLeft />
            Go Back
          </button>

          <Link to="/" className="btn btn-primary btn-lg rounded-2xl gap-3 normal-case shadow-xl shadow-primary/20 font-bold">
            <FaHouse />
            Return Home
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-base-300/50">
          <p className="text-xs font-bold uppercase tracking-widest opacity-30">
            Error Code: 404_NOT_FOUND
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;