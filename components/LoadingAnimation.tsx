import Image from 'next/image';
import React from 'react';

const LoadingAnimation = ({ 
  message = "Wezi Medical Center", 
}) => {
  return (
    <div className="fixed z-[9999] top-0 left-0 flex-1  w-full h-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Main Animation Container */}
      <div className="relative">
        {/* Outer Pulse Ring */}
        <div className="w-40 h-40 border-4 border-blue-100 rounded-full animate-spin opacity-60">
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-900 border-r-blue-800 rounded-full animate-spin" style={{animationDuration: '3s'}}></div>
        </div>
        
        {/* Middle Heartbeat Ring */}
        <div className="absolute inset-3 w-34 h-34 border-3 border-blue-200 rounded-full animate-pulse" style={{animationDuration: '1.2s'}}>
          <div className="absolute inset-0 border-3 border-transparent border-b-blue-700 border-l-blue-600 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '2s'}}></div>
        </div>
        
        {/* Inner Medical Core */}
        <div className="absolute inset-8 w-24 h-24 bg-gradient-to-br from-blue-50 via-blue-200 to-blue-900 rounded-full flex items-center justify-center shadow-2xl" style={{animation: 'heartbeat 1.5s ease-in-out infinite'}}>
          {/* Medical Cross Icon */}
          <Image src={"/wezLogo.png"} width={300} height={300} className='h-14 w-14' alt='' />
        </div>
        
        {/* DNA Helix Particles */}
        <div className="absolute -inset-12">
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-800 rounded-full opacity-80" style={{animation: 'orbit 4s linear infinite'}}></div>
          <div className="absolute top-1/4 right-0 w-2 h-2 bg-blue-600 rounded-full opacity-70" style={{animation: 'orbit 4s linear infinite', animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-0 w-2.5 h-2.5 bg-blue-900 rounded-full opacity-90" style={{animation: 'orbit 4s linear infinite', animationDelay: '2s'}}></div>
          <div className="absolute bottom-0 right-1/3 w-2 h-2 bg-blue-700 rounded-full opacity-60" style={{animation: 'orbit 4s linear infinite', animationDelay: '3s'}}></div>
          <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-80" style={{animation: 'orbit 4s linear infinite', animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-blue-800 rounded-full opacity-75" style={{animation: 'orbit 4s linear infinite', animationDelay: '2.5s'}}></div>
        </div>
        
        {/* Vital Signs Line */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <svg width="200" height="40" viewBox="0 0 200 40" className="text-blue-900">
            <path
              d="M0,20 L40,20 L45,10 L50,30 L55,5 L60,35 L65,20 L200,20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="400"
              strokeDashoffset="400"
              style={{animation: 'drawLine 3s ease-in-out infinite'}}
            />
          </svg>
        </div>
      </div>
      
      {/* Advanced Progress Bar */}
      <div className="mt-20 w-80 bg-blue-50 rounded-full h-2 overflow-hidden shadow-inner">
        <div className="h-full rounded-full relative overflow-hidden"
             style={{
               background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 25%, #60a5fa 50%, #3b82f6 75%, #1e3a8a 100%)',
               backgroundSize: '300% 100%',
               animation: 'medicalProgress 2.5s ease-in-out infinite'
             }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
               style={{animation: 'shimmer 2s ease-in-out infinite'}}></div>
        </div>
      </div>
      
      {/* Medical Center Branding */}
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2" style={{animation: 'fadeInUp 1s ease-out'}}>
          {message}
        </h1>
      </div>
      
      {/* Floating Medical Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 text-blue-200 opacity-30" style={{animation: 'float 6s ease-in-out infinite'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <div className="absolute top-3/4 right-1/4 text-blue-200 opacity-20" style={{animation: 'float 8s ease-in-out infinite', animationDelay: '2s'}}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
          </svg>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes medicalProgress {
          0%, 100% { background-position: -300% 0; }
          50% { background-position: 300% 0; }
        }
        
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
        }
        
        @keyframes drawLine {
          0% { stroke-dashoffset: 400; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -400; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;