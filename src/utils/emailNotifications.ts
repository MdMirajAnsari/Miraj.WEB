const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'clevercottonmouth@gmail.com';
const formSubmitEndpoint =
  import.meta.env.VITE_FORMSUBMIT_ENDPOINT || 'https://formsubmit.co/ajax/8afc617e303d56fd038545b21c3045de';

const visitNotificationSessionKey = 'miraj-visit-notification-sent';
const visitorProfileStorageKey = 'miraj-visitor-profile';

type EmailPayload = Record<string, string>;
type VisitorProfile = {
  id: string;
  firstVisitedAt: string;
  lastVisitedAt: string;
  visitCount: number;
  recentPages: string[];
};

export const sendEmailNotification = async (payload: EmailPayload) => {
  const response = await fetch(formSubmitEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      _template: 'table',
      _captcha: 'false',
    }),
    keepalive: true,
  });

  if (!response.ok) {
    throw new Error('Unable to send email notification');
  }
};

const createVisitorId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const readVisitorProfile = (): VisitorProfile | null => {
  try {
    const storedProfile = window.localStorage.getItem(visitorProfileStorageKey);
    return storedProfile ? (JSON.parse(storedProfile) as VisitorProfile) : null;
  } catch {
    return null;
  }
};

const updateVisitorProfile = (visitedAtIso: string): VisitorProfile => {
  const currentProfile = readVisitorProfile();
  const currentPage = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const recentPages = [currentPage, ...(currentProfile?.recentPages || []).filter((page) => page !== currentPage)].slice(0, 5);

  const nextProfile = {
    id: currentProfile?.id || createVisitorId(),
    firstVisitedAt: currentProfile?.firstVisitedAt || visitedAtIso,
    lastVisitedAt: visitedAtIso,
    visitCount: (currentProfile?.visitCount || 0) + 1,
    recentPages,
  };

  try {
    window.localStorage.setItem(visitorProfileStorageKey, JSON.stringify(nextProfile));
  } catch {
    // Storage can be disabled in private browsing or strict browser settings.
  }

  return nextProfile;
};

export const notifySiteVisit = () => {
  if (typeof window === 'undefined') return;

  try {
    if (window.sessionStorage.getItem(visitNotificationSessionKey)) return;
    window.sessionStorage.setItem(visitNotificationSessionKey, 'true');
  } catch {
    // If storage is blocked, still avoid breaking the visitor's page.
  }

  const visitedAtDate = new Date();
  const visitedAtIso = visitedAtDate.toISOString();
  const visitedAt = visitedAtDate.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Kolkata',
  });
  const visitorProfile = updateVisitorProfile(visitedAtIso);

  void sendEmailNotification({
    name: 'Portfolio visitor',
    email: contactEmail,
    message: [
      'Someone visited your portfolio website.',
      `Page: ${window.location.href}`,
      `Referrer: ${document.referrer || 'Direct visit'}`,
      `Visited at: ${visitedAt}`,
      `Visitor ID: ${visitorProfile.id}`,
      `First visit: ${visitorProfile.firstVisitedAt}`,
      `Last visit: ${visitorProfile.lastVisitedAt}`,
      `Visit count on this browser: ${visitorProfile.visitCount}`,
      `Recent pages on this site: ${visitorProfile.recentPages.join(', ')}`,
      `Browser: ${window.navigator.userAgent}`,
      `Language: ${window.navigator.language}`,
      `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
      `Platform: ${window.navigator.platform}`,
      `Cookies enabled: ${window.navigator.cookieEnabled ? 'Yes' : 'No'}`,
      `Screen: ${window.screen.width}x${window.screen.height}`,
      `Viewport: ${window.innerWidth}x${window.innerHeight}`,
    ].join('\n'),
    _subject: 'New portfolio website visit',
  }).catch((error) => {
    console.error('Visit notification failed', error);
  });
};

export { contactEmail, formSubmitEndpoint };
