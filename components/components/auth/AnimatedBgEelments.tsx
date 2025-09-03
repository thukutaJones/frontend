"use client"

import React, { useRef } from 'react'

const AnimatedBgEelments = () => {
    const mousePositionRef = useRef({ x: 0, y: 0 });

    const FloatingOrb: React.FC<{ className: string; delay: number }> = ({ className, delay }) => (
        <div
            className={`absolute rounded-full blur-xl opacity-20 animate-pulse ${className}`}
            style={{
                animation: `float 8s ease-in-out infinite ${delay}s`,
                background: 'linear-gradient(45deg, #16a34a, #eab308)'
            }}
        />
    );

    const ParallaxShape: React.FC<{ children: React.ReactNode; intensity: number }> = ({ children, intensity }) => (
        <div
            className="absolute"
            style={{
                transform: `translate3d(${mousePositionRef.current.x * intensity}px, ${mousePositionRef.current.y * intensity}px, 0)`
            }}
        >
            {children}
        </div>
    );
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Geometric Patterns */}
            <div className="absolute top-0 left-0 w-full h-full">
                <ParallaxShape intensity={10}>
                    <div className="absolute top-20 left-20 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                </ParallaxShape>
                <ParallaxShape intensity={15}>
                    <div className="absolute top-40 right-40 w-3 h-3 bg-yellow-500 rounded-full animate-bounce" />
                </ParallaxShape>
                <ParallaxShape intensity={8}>
                    <div className="absolute bottom-40 left-40 w-1 h-1 bg-blue-600 rounded-full animate-pulse" />
                </ParallaxShape>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2316a34a%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        </div>
    )
}

export default AnimatedBgEelments