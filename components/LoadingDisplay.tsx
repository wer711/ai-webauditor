
import React from 'react';

export const LoadingDisplay: React.FC = () => {
    const messages = [
        "Warming up the analysis engines...",
        "Scanning for SEO opportunities...",
        "Checking security protocols...",
        "Measuring performance metrics...",
        "Reviewing accessibility standards...",
        "Almost there, compiling your report..."
    ];
    const [message, setMessage] = React.useState(messages[0]);
    
    React.useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % messages.length;
            setMessage(messages[index]);
        }, 2500);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div className="text-center p-8 bg-gray-800/50 rounded-lg border border-gray-700 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-semibold mb-2 text-white">Analysis in Progress</h2>
        <p className="text-gray-400 transition-opacity duration-500">{message}</p>
    </div>
  );
};
