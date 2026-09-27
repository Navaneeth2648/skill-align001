import { ResumeAnalysisResult } from '../types/resume';

export const ResumeApiService = {
  /**
   * Uploads and processes resume document through server-side parsing & Adzuna job recommendation engine.
   */
  async uploadAndAnalyzeResume(file: File): Promise<ResumeAnalysisResult> {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await fetch('/api/resume/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorMsg = 'Failed to analyze resume document.';
      try {
        const errJson = await response.json();
        errorMsg = errJson.message || errJson.error || errorMsg;
      } catch (_) {}
      throw new Error(errorMsg);
    }

    const data = await response.json();
    if (!data.success || !data.analysis) {
      throw new Error(data.message || 'No analysis data returned from server.');
    }

    return data.analysis;
  },

  /**
   * Fetches latest saved resume analysis from server state.
   */
  async getLatestAnalysis(): Promise<ResumeAnalysisResult | null> {
    try {
      const response = await fetch('/api/resume/latest');
      if (!response.ok) return null;
      const data = await response.json();
      return data.analysis || null;
    } catch (err) {
      console.warn('[ResumeService] Could not fetch latest resume analysis:', err);
      return null;
    }
  },

  /**
   * Clears saved resume analysis.
   */
  async clearAnalysis(): Promise<void> {
    try {
      await fetch('/api/resume/clear', { method: 'DELETE' });
    } catch (err) {
      console.warn('[ResumeService] Failed to clear resume analysis on server:', err);
    }
  },
};
