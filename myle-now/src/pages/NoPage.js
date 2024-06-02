import React, { useState, useEffect } from 'react';

function NoPage() {
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            window.history.back();
        }, 10000);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <>
            <h2>404: Page Not Found</h2>
            <p>Returning in {countdown} seconds...</p>
        </>
    );
}

export default NoPage;
