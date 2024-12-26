'use client';
import React, { useEffect } from "react";
//import "./Snowflakes.css"; // Add relevant styles here

const Snowfall: React.FC = () => {
    const snowflakeCount = 10; // Number of snowflakes

    const createSnowflakes = () => {
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflake.innerHTML = "&#10052;"; // Unicode snowflake symbol

            // Random positioning and animation duration
            snowflake.style.left = `${Math.random() * window.innerWidth}px`;
            snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
            snowflake.style.opacity = `${Math.random()}`;
            snowflake.style.fontSize = `${Math.random() * 20 + 10}px`;

            document.body.appendChild(snowflake);

            // Remove snowflakes after they fall
            setTimeout(() => {
                snowflake.remove();
            }, 20000);
        }
    };

    useEffect(() => {
        const interval = setInterval(createSnowflakes, 500);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return null; // This component doesn't render anything directly
};

export default Snowfall;
