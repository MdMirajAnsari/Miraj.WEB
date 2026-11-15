import { integrations } from './integrations';
import type {
  DomainRecord,
  DomainsDbAccountInfo,
  DomainsDbSearchResult,
  DomainSearchParams,
} from '../models';

const DOMAINSDB_STORAGE_KEY = 'miraj-domainsdb-custom-key';
const RECENT_SEARCHES_KEY = 'miraj-domainsdb-recent';

export const getEffectiveApiKey = (): string => {
  if (typeof window !== 'undefined') {
    const customKey = window.localStorage.getItem(DOMAINSDB_STORAGE_KEY);
    if (customKey && customKey.trim()) return customKey.trim();
  }
  return integrations.domainsdb.apiKey || 'f962e99b-bc47-4ca8-88d8-810445b2eeb6';
};

export const setStoredApiKey = (apiKey: string) => {
  if (typeof window === 'undefined') return;
  if (!apiKey || !apiKey.trim()) {
    window.localStorage.removeItem(DOMAINSDB_STORAGE_KEY);
  } else {
    window.localStorage.setItem(DOMAINSDB_STORAGE_KEY, apiKey.trim());
  }
};

export const clearStoredApiKey = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(DOMAINSDB_STORAGE_KEY);
  }
};

export const getDomainsDbHeaders = (apiKey?: string): HeadersInit => {
  const key = (apiKey && apiKey.trim()) || getEffectiveApiKey();
  return {
    'X-Api-Key': key,
    'api-key': key,
    Accept: 'application/json',
  };
};

export const getDomainsDbAccountInfo = async (
  customApiKey?: string,
  signal?: AbortSignal,
): Promise<DomainsDbAccountInfo> => {
  const key = (customApiKey && customApiKey.trim()) || getEffectiveApiKey();

  try {
    const response = await fetch(`${integrations.domainsdb.baseUrl}/info/api`, {
      method: 'GET',
      headers: getDomainsDbHeaders(key),
      signal,
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      return {
        success: false,
        license: 'unknown',
        item_id: key,
        customer_email: '',
        calls_made: 0,
        rate_limit_hits: 0,
        credit_depletion_hits: 0,
        is_depleted_flag: 0,
        error: data.error || data.message || `HTTP ${response.status}`,
      };
    }

    return {
      success: data.success,
      license: data.license || 'community',
      item_id: data.item_id || key,
      item_name: data.item_name || 'API key',
      customer_name: data.customer_name || '',
      customer_email: data.customer_email || '',
      license_limit: data.license_limit || '0',
      calls_made: Number(data.calls_made) || 0,
      rate_limit_hits: Number(data.rate_limit_hits) || 0,
      credit_depletion_hits: Number(data.credit_depletion_hits) || 0,
      is_depleted_flag: Number(data.is_depleted_flag) || 0,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error;
    }
    return {
      success: false,
      license: 'community',
      item_id: key,
      customer_email: '',
      calls_made: 0,
      rate_limit_hits: 0,
      credit_depletion_hits: 0,
      is_depleted_flag: 0,
      error: error instanceof Error ? error.message : 'Failed to connect to DomainsDB info API',
    };
  }
};

export const searchDomains = async (
  params: DomainSearchParams,
  apiKey?: string,
  signal?: AbortSignal,
): Promise<DomainsDbSearchResult> => {
  const key = (apiKey && apiKey.trim()) || getEffectiveApiKey();
  const trimmed = params.domain.trim();

  if (!trimmed) {
    return {
      domains: [],
      total: 0,
      time: '0s',
      next_page: null,
    };
  }

  const queryParams = new URLSearchParams();
  queryParams.set('domain', trimmed);

  if (params.zone && params.zone !== 'all') {
    queryParams.set('zone', params.zone.replace(/^\./, ''));
  }
  if (params.country) {
    queryParams.set('country', params.country);
  }
  if (typeof params.isDead === 'boolean') {
    queryParams.set('isDead', String(params.isDead));
  }

  const url = `${integrations.domainsdb.baseUrl}/domains/search?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getDomainsDbHeaders(key),
      signal,
    });

    const data = await response.json();

    if (data.error) {
      const isCreditsError =
        typeof data.error === 'string' &&
        data.error.toLowerCase().includes('insufficient credits');

      return {
        domains: [],
        total: 0,
        next_page: null,
        error: isCreditsError
          ? 'DomainsDB API key credit limit reached (Community tier). You can switch to Demo Mode below or upgrade credits at domainsdb.info.'
          : String(data.error || data.message || 'Error querying DomainsDB'),
      };
    }

    const rawDomains: DomainRecord[] = Array.isArray(data.domains) ? data.domains : [];
    const normalizedDomains: DomainRecord[] = rawDomains.map((item) => ({
      ...item,
      dead: item.dead ?? item.isDead ?? false,
      isDead: item.isDead ?? item.dead ?? false,
      zone: item.zone || (item.domain.includes('.') ? item.domain.split('.').pop() : ''),
    }));

    return {
      domains: normalizedDomains,
      total: typeof data.total === 'number' ? data.total : normalizedDomains.length,
      time: data.time || '0s',
      next_page: data.next_page || null,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error;
    }
    return {
      domains: [],
      total: 0,
      next_page: null,
      error: error instanceof Error ? error.message : 'Unable to connect to DomainsDB service',
    };
  }
};

export const getDemoSearchResults = (params: DomainSearchParams): DomainsDbSearchResult => {
  const query = params.domain.toLowerCase().trim();
  const zone = params.zone && params.zone !== 'all' ? params.zone.toLowerCase().replace(/^\./, '') : null;

  const demoCatalog: DomainRecord[] = [
    {
      domain: 'miraj.dev',
      zone: 'dev',
      isDead: 'false',
      dead: 'false',
      country: 'IN',
      A: ['76.76.21.21', '76.76.21.22'],
      NS: ['ns1.vercel-dns.com', 'ns2.vercel-dns.com'],
      CNAME: ['cname.vercel-dns.com'],
      MX: ['mail.google.com'],
      TXT: ['v=spf1 include:_spf.google.com ~all', 'google-site-verification=abc123xyz'],
      create_date: '2023-04-12',
      update_date: '2026-02-18',
    },
    {
      domain: 'miraj-portfolio.com',
      zone: 'com',
      isDead: 'false',
      dead: 'false',
      country: 'IN',
      A: ['185.199.108.153', '185.199.109.153'],
      NS: ['dns1.p01.nsone.net', 'dns2.p01.nsone.net'],
      CNAME: [],
      MX: ['aspmx.l.google.com'],
      TXT: ['v=spf1 include:mailgun.org ~all'],
      create_date: '2022-09-05',
      update_date: '2026-01-10',
    },
    {
      domain: 'miraj-tech.io',
      zone: 'io',
      isDead: 'false',
      dead: 'false',
      country: 'US',
      A: ['104.21.45.180', '172.67.199.82'],
      NS: ['carter.ns.cloudflare.com', 'gwen.ns.cloudflare.com'],
      CNAME: [],
      MX: [],
      TXT: ['cloudflare-verify=78239014'],
      create_date: '2024-01-20',
      update_date: '2026-03-01',
    },
    {
      domain: 'miraj-apps.org',
      zone: 'org',
      isDead: 'true',
      dead: 'true',
      country: 'IN',
      A: [],
      NS: [],
      CNAME: [],
      MX: [],
      TXT: [],
      create_date: '2021-08-11',
      update_date: '2025-08-12',
    },
    {
      domain: 'google.com',
      zone: 'com',
      isDead: 'false',
      dead: 'false',
      country: 'US',
      A: ['142.250.190.46', '142.250.190.78'],
      NS: ['ns1.google.com', 'ns2.google.com', 'ns3.google.com', 'ns4.google.com'],
      CNAME: [],
      MX: ['smtp.google.com'],
      TXT: ['v=spf1 include:_netblocks.google.com ~all'],
      create_date: '1997-09-15',
      update_date: '2026-09-09',
    },
    {
      domain: 'github.com',
      zone: 'com',
      isDead: 'false',
      dead: 'false',
      country: 'US',
      A: ['140.82.112.4', '140.82.114.4'],
      NS: ['dns1.p08.nsone.net', 'ns1.p16.dynect.net'],
      CNAME: [],
      MX: [],
      TXT: ['v=spf1 include:_spf.github.com ~all'],
      create_date: '2007-10-09',
      update_date: '2026-10-09',
    },
    {
      domain: 'react.dev',
      zone: 'dev',
      isDead: 'false',
      dead: 'false',
      country: 'US',
      A: ['76.76.21.21'],
      NS: ['ns1.vercel-dns.com', 'ns2.vercel-dns.com'],
      CNAME: [],
      MX: [],
      TXT: ['v=spf1 ~all'],
      create_date: '2023-01-15',
      update_date: '2026-05-10',
    },
    {
      domain: 'cloud-security.net',
      zone: 'net',
      isDead: 'false',
      dead: 'false',
      country: 'DE',
      A: ['198.51.100.22'],
      NS: ['ns-10.awsdns-01.com', 'ns-11.awsdns-02.net'],
      CNAME: [],
      MX: ['mail.cloud-security.net'],
      TXT: ['dmarc=reject'],
      create_date: '2020-03-14',
      update_date: '2025-11-20',
    },
    {
      domain: 'dev-workspace.app',
      zone: 'app',
      isDead: 'false',
      dead: 'false',
      country: 'SG',
      A: ['172.67.142.11'],
      NS: ['ns1.digitalocean.com', 'ns2.digitalocean.com'],
      CNAME: [],
      MX: [],
      TXT: [],
      create_date: '2024-06-11',
      update_date: '2026-01-05',
    },
  ];

  let filtered = demoCatalog.filter((item) =>
    item.domain.toLowerCase().includes(query) || (query === '' && true),
  );

  if (zone) {
    filtered = filtered.filter((item) => (item.zone || '').toLowerCase() === zone);
  }

  if (typeof params.isDead === 'boolean') {
    filtered = filtered.filter((item) => {
      const isDeadBool = item.isDead === 'true' || item.isDead === true;
      return isDeadBool === params.isDead;
    });
  }

  // If user searched for something not in standard catalog, generate synthetic valid entries
  if (filtered.length === 0 && query.length > 0) {
    const syntheticZones = zone ? [zone] : ['com', 'io', 'dev', 'org', 'app'];
    filtered = syntheticZones.map((z, idx) => ({
      domain: `${query}.${z}`,
      zone: z,
      isDead: idx % 3 === 0 ? 'true' : 'false',
      dead: idx % 3 === 0 ? 'true' : 'false',
      country: ['US', 'IN', 'GB', 'DE'][idx % 4],
      A: idx % 3 === 0 ? [] : [`104.21.${idx * 17}.10`],
      NS: idx % 3 === 0 ? [] : ['ns1.cloudflare.com', 'ns2.cloudflare.com'],
      CNAME: [],
      MX: idx % 3 === 0 ? [] : [`mail.${query}.${z}`],
      TXT: [`v=spf1 ~all`],
      create_date: '2023-05-18',
      update_date: '2026-01-12',
    }));
  }

  return {
    domains: filtered,
    total: filtered.length,
    time: '0.012s',
    next_page: null,
    isDemo: true,
  };
};

export const getRecentSearches = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? JSON.parse(raw) : ['miraj', 'google', 'react', 'github', 'cloud'];
  } catch {
    return ['miraj', 'google', 'react', 'github', 'cloud'];
  }
};

export const saveRecentSearch = (term: string) => {
  if (typeof window === 'undefined' || !term.trim()) return;
  try {
    const clean = term.trim().toLowerCase();
    const current = getRecentSearches().filter((item) => item !== clean);
    const updated = [clean, ...current].slice(0, 8);
    window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // Ignore localStorage write failures
  }
};

export const POPULAR_TLDS = [
  'all',
  'com',
  'org',
  'net',
  'io',
  'dev',
  'app',
  'ai',
  'in',
  'co',
  'me',
  'tech',
];
