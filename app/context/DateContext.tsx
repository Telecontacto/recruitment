'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

// Helper functions for default dates
export function getDefaultStartDate() {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    return date.toISOString().split('T')[0];
}

export function getDefaultEndDate() {
    return new Date().toISOString().split('T')[0];
}

type DateContextType = {
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
};

const DateContext = createContext<DateContextType | undefined>(undefined);

export function DateProvider({ children }: { children: ReactNode }) {
    const [startDate, setStartDate] = useState(getDefaultStartDate());
    const [endDate, setEndDate] = useState(getDefaultEndDate());

    return (
        <DateContext.Provider value={{ startDate, endDate, setStartDate, setEndDate }}>
            {children}
        </DateContext.Provider>
    );
}

export function useDateContext() {
    const context = useContext(DateContext);
    if (context === undefined) {
        throw new Error('useDateContext must be used within a DateProvider');
    }
    return context;
}
