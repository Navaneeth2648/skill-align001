import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, CheckCircle2, AlertCircle, ExternalLink, RefreshCw, 
  ShieldCheck, Lock, Building2, User, KeyRound, LogOut
} from 'lucide-react';
import { LinkedInService, LinkedInStatusResponse } from '../../services/dataService';
import { Button, Badge, Alert } from '../ui';

export const LinkedInIntegrationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [status, setStatus] = useState<LinkedInStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await LinkedInService.getStatus();
      setStatus(data);
    } catch {
      setError('Unable to load LinkedIn integration telemetry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnect = async () => {
    setActionLoading(true);
    try {
      const res = await LinkedInService.getAuthUrl();
      if (res.error) {
        setError(res.error);
        showToast('LinkedIn configuration required in backend environment.');
      } else if (res.url) {
        window.location.href = res.url;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to initialize LinkedIn OAuth flow.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setActionLoading(true);
    try {
      const updated = await LinkedInService.disconnect();
      setStatus(updated);
      showToast('LinkedIn account successfully disconnected.');
    } catch {
      showToast('Failed to disconnect LinkedIn account.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="linkedInModalTitle"
    >
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#0a66c2] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-white text-lg">
              in
            </div>
            <div>
              <h3 id="linkedInModalTitle" className="text-sm font-bold text-white tracking-tight">
                Official LinkedIn Integration Gateway
              </h3>
              <p className="text-[11px] text-white/80">
                Authorized OAuth 2.0 &amp; Institutional Partner Telemetry
              </p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={onClose} 
            className="p-1 rounded text-white/80 hover:text-white transition-colors"
            aria-label="Close LinkedIn modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs custom-scrollbar">
          {error && (
            <Alert variant="danger" title="Integration Notice">
              {error}
            </Alert>
          )}

          {/* Connection Status Card */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                Connection Status
              </span>
              {status?.connected ? (
                <Badge variant="success" size="sm" dot>
                  Connected &amp; Verified
                </Badge>
              ) : status?.configured ? (
                <Badge variant="warning" size="sm" dot>
                  OAuth App Configured • Awaiting Sign-in
                </Badge>
              ) : (
                <Badge variant="neutral" size="sm" dot>
                  Developer App Not Configured
                </Badge>
              )}
            </div>

            {status?.connected && status.profile ? (
              <div className="flex items-center gap-3 pt-1">
                <div className="w-10 h-10 rounded-full bg-[#0a66c2]/10 border border-[#0a66c2]/30 flex items-center justify-center text-[#0a66c2] font-bold text-sm">
                  {status.profile.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate">
                    {status.profile.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {status.profile.headline} • {status.profile.organization}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Authorized on: {status.connectedAt ? new Date(status.connectedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Session active'}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleDisconnect}
                  isLoading={actionLoading}
                  leftIcon={<LogOut className="w-3.5 h-3.5" />}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Authorize your LinkedIn member account using official LinkedIn OAuth 2.0. This allows the state portal to cross-reference verified enterprise employer demand and accredited training cohorts.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleConnect}
                    isLoading={actionLoading || loading}
                    className="bg-[#0a66c2] hover:bg-[#004182] text-white"
                  >
                    <span>Connect Official LinkedIn Account</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={loadStatus}
                    isLoading={loading}
                    leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                  >
                    Refresh Status
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Scope and Permissions Matrix */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                Authorized Scopes &amp; Partner Approvals
              </h4>
              <span className="text-[10px] text-slate-500">Official LinkedIn API Policy</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
              {status?.permissions.map((perm, idx) => (
                <div key={idx} className="p-3 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-0.5 min-w-0">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      {perm.name}
                    </span>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      {perm.description}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      perm.status === 'Active' 
                        ? 'success' 
                        : perm.status === 'Requires Enterprise Approval'
                        ? 'warning' 
                        : 'neutral'
                    }
                    size="xs"
                  >
                    {perm.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Policy & Security Notice */}
          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Data Protection &amp; Anti-Scraping Commitment</span>
            </div>
            <p className="leading-relaxed">
              In strict accordance with LinkedIn Terms of Service, SkillAlign does not scrape, crawl, or store unauthorized member data. Direct job posting and organization analytics are accessible exclusively to authorized enterprise partner tiers upon review.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-[11px] text-slate-500">
          <span>Gateway: LinkedIn OAuth 2.0 • OpenID Connect</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
