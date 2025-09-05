
import React from 'react';

interface ScoreCardProps {
  title: string;
  score: number;
  Icon: React.ElementType;
  onClick: () => void;
  isActive: boolean;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, Icon, onClick, isActive }) => {
  const getScoreColor = (s: number) => {
    if (s >= 90) return 'text-green-400';
    if (s >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const circumference = 30 * 2 * Math.PI;

  return (
    <button 
      onClick={onClick} 
      className={`p-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${isActive ? 'bg-gray-700/80 shadow-lg scale-105' : 'bg-gray-800'}`}
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" className="text-gray-700" fill="transparent" />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (score / 100) * circumference}
              className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
              fill="transparent"
            />
          </svg>
          <span className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-left">{title}</h4>
          <Icon className="h-6 w-6 text-gray-400 mt-1" />
        </div>
      </div>
    </button>
  );
};
