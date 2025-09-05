
export interface Finding {
  check: string;
  result: string;
  status: 'pass' | 'fail' | 'warn' | 'info';
}

export interface ReportSection {
  score: number;
  findings: Finding[];
}

export interface QuickWin {
  title: string;
  suggestion: string;
}

export interface AuditReport {
  seo: ReportSection;
  performance: ReportSection;
  security: ReportSection;
  accessibility: ReportSection;
  commerce: ReportSection;
  brokenLinks: {
    findings: {
      url: string;
      status: number;
    }[];
  };
  quickWins: QuickWin[];
}
