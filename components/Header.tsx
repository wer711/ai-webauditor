
import React from 'react';
import { AnalyticsIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <AnalyticsIcon className="h-8 w-8 text-cyan-400 mr-3" />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          AI Web Auditor
        </h1>
      </div>
    </header>
  );
};
