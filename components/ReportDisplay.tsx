
import React, { useState } from 'react';
import { AuditReport } from '../types';
import { ScoreCard } from './ScoreCard';
import { ReportSection } from './ReportSection';
import { QuickWins } from './QuickWins';
import { SeoIcon, PerformanceIcon, SecurityIcon, AccessibilityIcon, CommerceIcon, BrokenLinkIcon } from './icons';

interface ReportDisplayProps {
  report: AuditReport;
  analyzedUrl: string;
}

type SectionKey = 'seo' | 'performance' | 'security' | 'accessibility' | 'commerce';

export const ReportDisplay: React.FC<ReportDisplayProps> = ({ report, analyzedUrl }) => {
  const [activeTab, setActiveTab] = useState<SectionKey>('seo');

  const sections: { key: SectionKey; label: string; icon: React.FC<React.SVGProps<SVGSVGElement>>; data: AuditReport['seo'] | AuditReport['performance'] | AuditReport['security'] | AuditReport['accessibility'] | AuditReport['commerce'] }[] = [
    { key: 'seo', label: 'SEO', icon: SeoIcon, data: report.seo },
    { key: 'performance', label: 'Performance', icon: PerformanceIcon, data: report.performance },
    { key: 'security', label: 'Security', icon: SecurityIcon, data: report.security },
    { key: 'accessibility', label: 'Accessibility', icon: AccessibilityIcon, data: report.accessibility },
    { key: 'commerce', label: 'Commerce', icon: CommerceIcon, data: report.commerce },
  ];
  
  const activeSectionData = sections.find(s => s.key === activeTab)?.data;

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-white">Audit Report</h2>
        <p className="text-lg text-cyan-400 break-all">{analyzedUrl}</p>
        <p className="text-sm text-gray-500 mt-1">Generated on: {new Date().toLocaleString()}</p>
      </div>
      
      <QuickWins wins={report.quickWins} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {sections.map(({ key, label, icon: Icon, data }) => (
           <ScoreCard key={key} title={label} score={data.score} Icon={Icon} onClick={() => setActiveTab(key)} isActive={activeTab === key} />
        ))}
      </div>

      <div className="mt-8">
        {activeSectionData && (
          <ReportSection
            title={sections.find(s => s.key === activeTab)?.label || ''}
            findings={activeSectionData.findings}
          />
        )}
        {report.brokenLinks.findings.length > 0 && (
            <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-2xl font-bold mb-4 flex items-center"><BrokenLinkIcon className="h-6 w-6 mr-3 text-cyan-400" />Broken Links</h3>
                 <ul className="space-y-3">
                    {report.brokenLinks.findings.map((link, index) => (
                        <li key={index} className="flex items-center text-red-400 bg-gray-900/50 p-3 rounded-md">
                           <span className="font-mono text-sm break-all">{link.url}</span>
                           <span className="ml-auto font-semibold bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-xs">{link.status}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )}
      </div>
    </div>
  );
};
