
import React, { useState, useCallback } from 'react';
import { AuditReport } from './types';
import { analyzeSite } from './services/geminiService';
import { Header } from './components/Header';
import { UrlInputForm } from './components/UrlInputForm';
import { LoadingDisplay } from './components/LoadingDisplay';
import { ReportDisplay } from './components/ReportDisplay';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Hero } from './components/Hero';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<AuditReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async () => {
    if (!url) {
      setError('Please enter a valid URL.');
      return;
    }
    setIsLoading(true);
    setAuditResult(null);
    setError(null);
    
    try {
      const result = await analyzeSite(url);
      setAuditResult(result);
    } catch (err) {
      console.error(err);
      setError('An error occurred during the analysis. The website might be inaccessible, or there was an issue with the API. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <UrlInputForm
          url={url}
          setUrl={setUrl}
          onAnalyze={handleAnalysis}
          isLoading={isLoading}
        />
        
        {error && <ErrorDisplay message={error} />}

        {isLoading && <LoadingDisplay />}
        
        {!isLoading && !auditResult && !error && <Hero />}

        {auditResult && <ReportDisplay report={auditResult} analyzedUrl={url} />}
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Gemini. &copy; {new Date().getFullYear()} AI Web Auditor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
