
import React from 'react';
import { SeoIcon, PerformanceIcon, SecurityIcon, AccessibilityIcon } from './icons';

export const Hero: React.FC = () => {
  return (
    <div className="text-center p-8 bg-gray-800/30 rounded-lg border border-dashed border-gray-700">
      <h2 className="text-3xl font-bold mb-4 text-white">Unlock Your Website's Full Potential</h2>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
        Enter a URL above to get an instant, AI-powered audit. We'll analyze key areas of your site and provide actionable insights to help you improve.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <SeoIcon className="h-10 w-10 text-cyan-400 mb-2" />
          <span className="font-semibold">SEO</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <PerformanceIcon className="h-10 w-10 text-cyan-400 mb-2" />
          <span className="font-semibold">Performance</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <SecurityIcon className="h-10 w-10 text-cyan-400 mb-2" />
          <span className="font-semibold">Security</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
          <AccessibilityIcon className="h-10 w-10 text-cyan-400 mb-2" />
          <span className="font-semibold">Accessibility</span>
        </div>
      </div>
    </div>
  );
};
