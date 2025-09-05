
import React from 'react';
import type { Finding } from '../types';
import { CheckIcon, WarningIcon, ErrorIcon, InfoIcon } from './icons';

interface ReportSectionProps {
  title: string;
  findings: Finding[];
}

const statusMap = {
  pass: {
    icon: CheckIcon,
    color: 'text-green-400',
    bgColor: 'bg-green-900/30'
  },
  warn: {
    icon: WarningIcon,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/30'
  },
  fail: {
    icon: ErrorIcon,
    color: 'text-red-400',
    bgColor: 'bg-red-900/30'
  },
  info: {
    icon: InfoIcon,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/30'
  }
};

export const ReportSection: React.FC<ReportSectionProps> = ({ title, findings }) => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 animate-fade-in">
      <h3 className="text-2xl font-bold mb-6 text-white">{title} Details</h3>
      <div className="space-y-4">
        {findings.map((finding, index) => {
          const { icon: Icon, color, bgColor } = statusMap[finding.status] || statusMap.info;
          return (
            <div key={index} className={`p-4 rounded-lg flex items-start space-x-4 ${bgColor}`}>
              <Icon className={`h-6 w-6 mt-1 flex-shrink-0 ${color}`} />
              <div>
                <p className="font-semibold text-gray-200">{finding.check}</p>
                <p className="text-gray-400">{finding.result}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
