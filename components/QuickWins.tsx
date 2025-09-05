
import React from 'react';
import { QuickWin } from '../types';
import { CheckCircleIcon } from './icons';

interface QuickWinsProps {
  wins: QuickWin[];
}

export const QuickWins: React.FC<QuickWinsProps> = ({ wins }) => {
  if (!wins || wins.length === 0) {
    return null;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-cyan-900/50 to-gray-800 rounded-lg border border-cyan-700">
      <h3 className="text-2xl font-bold mb-4 text-white">🚀 Quick Wins</h3>
      <p className="text-gray-400 mb-6">Easy suggestions to implement for a quick impact.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wins.map((win, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700 transform hover:border-cyan-500 transition-colors duration-200">
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-200">{win.title}</h4>
                <p className="text-gray-400 text-sm">{win.suggestion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
