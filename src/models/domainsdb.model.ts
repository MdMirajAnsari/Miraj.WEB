export interface DomainRecord {
  domain: string;
  zone?: string;
  isDead?: string | boolean;
  dead?: string | boolean;
  country?: string;
  A?: string[];
  NS?: string[];
  CNAME?: string[];
  MX?: string[];
  TXT?: string[];
  create_date?: string;
  update_date?: string;
}

export interface DomainsDbSearchResult {
  domains: DomainRecord[];
  total: number;
  time?: string;
  next_page?: string | null;
  error?: string;
  message?: string;
  isDemo?: boolean;
}

export interface DomainsDbAccountInfo {
  success?: string | boolean;
  license: string;
  item_id: string;
  item_name?: string;
  customer_name?: string;
  customer_email?: string;
  license_limit?: string;
  calls_made: number;
  rate_limit_hits: number;
  credit_depletion_hits: number;
  is_depleted_flag: number;
  error?: string;
}

export interface DomainSearchParams {
  domain: string;
  zone?: string;
  country?: string;
  isDead?: boolean;
}
