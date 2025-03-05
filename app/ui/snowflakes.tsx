'use client';
import React, { useEffect, useState } from "react";
import getSeasonConfig from "@/app/utils/seasons";

const Snowfall: React.FC = () => {
    const { config } = getSeasonConfig();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }, []);

    const createSnowflakes = () => {
        for (let i = 0; i < 3; i++) {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflake.innerHTML = config.symbol;

            // Random color from season's palette
            const color = config.colors[Math.floor(Math.random() * config.colors.length)];
            snowflake.style.color = isDarkMode ? darkenColor(color) : color;

            // Random positioning and animation
            snowflake.style.left = `${Math.random() * window.innerWidth}px`;
            snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
            snowflake.style.opacity = `${Math.random() * 0.5 + 0.5}`;
            snowflake.style.fontSize = `${Math.random() * 20 + 10}px`;

            document.body.appendChild(snowflake);

            // Remove after animation
            setTimeout(() => {
                snowflake.remove();
            }, 20000);
        }
    };

    const darkenColor = (color: string) => {
        // Simple function to darken a color
        let colorValue = parseInt(color.slice(1), 16);
        colorValue = Math.floor(colorValue * 0.7);
        return `#${colorValue.toString(16).padStart(6, '0')}`;
    };

    useEffect(() => {
        const interval = setInterval(createSnowflakes, 2000);  // Changed from 1000 to 2000
        return () => clearInterval(interval);
    }, []);

    return null;
};

export default Snowfall;
