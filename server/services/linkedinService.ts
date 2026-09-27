import { getStoredState, saveStoredState } from './persistenceService';

export interface LinkedInStatus {
  configured: boolean;
  connected: boolean;
  connectedAt: string | null;
  clientIdConfigured: boolean;
  clientSecretConfigured: boolean;
  profile: {
    name: string;
    headline: string;
    email: string;
    organization: string;
    avatarUrl?: string;
  } | null;
  permissions: {
    scope: string;
    name: string;
    status: 'Active' | 'Pending Authorization' | 'Requires Enterprise Approval';
    description: string;
  }[];
  requiresApproval: string[];
  notice: string;
}

export const PERMISSION_MATRIX = [
  {
    scope: 'openid',
    name: 'OpenID Connect Authentication',
    status: 'Active' as const,
    description: 'Enables official federated identity authentication with LinkedIn account.',
  },
  {
    scope: 'profile',
    name: 'Basic Professional Profile',
    status: 'Active' as const,
    description: 'Accesses member name, localized headline, and verified primary language.',
  },
  {
    scope: 'email',
    name: 'Verified Primary Email',
    status: 'Active' as const,
    description: 'Accesses primary email associated with the authorized member account.',
  },
  {
    scope: 'r_organization_social',
    name: 'Company Page & Social Analytics',
    status: 'Requires Enterprise Approval' as const,
    description: 'Requires LinkedIn Community Management API or Partner Enterprise approval.',
  },
  {
    scope: 'r_talent_insights',
    name: 'LinkedIn Talent Solutions API',
    status: 'Requires Enterprise Approval' as const,
    description: 'Corporate labour market intelligence querying requires LinkedIn Talent Solutions contract.',
  },
  {
    scope: 'w_organization_job_postings',
    name: 'Job Posting API',
    status: 'Requires Enterprise Approval' as const,
    description: 'Automated vacancy synchronization requires certified ATS/Recruiter partner status.',
  },
];

export function getLinkedInAuthUrl(): { url: string; error?: string } {
  const clientId = process.env.LINKEDIN_CLIENT_ID?.trim();
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI?.trim() || 'http://localhost:5000/api/linkedin/callback';

  if (!clientId) {
    return {
      url: '',
      error: 'LINKEDIN_NOT_CONFIGURED: LINKEDIN_CLIENT_ID is not configured in backend environment.',
    };
  }

  const state = `ms_lmip_${Date.now()}`;
  const scope = encodeURIComponent('openid profile email');
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;

  return { url: authUrl };
}

export function getLinkedInStatus(): LinkedInStatus {
  const clientId = process.env.LINKEDIN_CLIENT_ID?.trim();
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET?.trim();
  const isConfigured = Boolean(clientId && clientSecret);

  const state = getStoredState();
  const session = state.linkedinSession;
  const isConnected = Boolean(session?.connected);

  return {
    configured: isConfigured,
    connected: isConnected,
    connectedAt: session?.connectedAt || null,
    clientIdConfigured: Boolean(clientId),
    clientSecretConfigured: Boolean(clientSecret),
    profile: isConnected ? session?.userProfile || null : null,
    permissions: PERMISSION_MATRIX.map(p => ({
      ...p,
      status: (isConnected && p.status === 'Active') 
        ? 'Active' 
        : p.status === 'Requires Enterprise Approval' 
        ? 'Requires Enterprise Approval' 
        : 'Pending Authorization',
    })),
    requiresApproval: [
      'LinkedIn Talent Solutions API (Contract required)',
      'Organization Insights API (Enterprise review required)',
      'Direct Job Ingestion API (Certified partner tier required)',
    ],
    notice: isConnected
      ? 'Authorized via LinkedIn OAuth 2.0 (OpenID Connect). Partner Enterprise APIs require LinkedIn developer app verification.'
      : isConfigured
      ? 'LinkedIn Developer App configured. Member authorization required.'
      : 'LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET are not configured in backend environment (.env).',
  };
}

export async function handleLinkedInCallback(code: string): Promise<LinkedInStatus> {
  const clientId = process.env.LINKEDIN_CLIENT_ID?.trim();
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET?.trim();
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI?.trim() || 'http://localhost:5000/api/linkedin/callback';

  if (!clientId || !clientSecret) {
    throw new Error('LINKEDIN_CREDENTIALS_MISSING: Credentials not present in backend environment.');
  }

  // Exchange authorization code for access token via official LinkedIn OAuth token endpoint
  const tokenParams = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
  });

  const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: tokenParams.toString(),
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text().catch(() => '');
    throw new Error(`LinkedIn token exchange failed: ${tokenRes.status} ${errorText}`);
  }

  const tokenData = (await tokenRes.json()) as { access_token?: string };
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    throw new Error('No access token returned by LinkedIn.');
  }

  // Fetch verified userinfo using OAuth access token
  const profileRes = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  let userProfile = {
    name: 'Verified LinkedIn Member',
    headline: 'Workforce Development Professional',
    email: 'member@linkedin.authorized',
    organization: 'Maharashtra State Employer Partner',
  };

  if (profileRes.ok) {
    const userInfo = (await profileRes.json()) as any;
    userProfile = {
      name: userInfo.name || `${userInfo.given_name || ''} ${userInfo.family_name || ''}`.trim() || userProfile.name,
      headline: 'Authorized LinkedIn Member',
      email: userInfo.email || userProfile.email,
      organization: 'Verified LinkedIn Partner Profile',
    };
  }

  const nowIso = new Date().toISOString();
  saveStoredState({
    linkedinSession: {
      connected: true,
      connectedAt: nowIso,
      userProfile,
    },
  });

  return getLinkedInStatus();
}

export function disconnectLinkedIn(): LinkedInStatus {
  saveStoredState({
    linkedinSession: null,
  });
  return getLinkedInStatus();
}
