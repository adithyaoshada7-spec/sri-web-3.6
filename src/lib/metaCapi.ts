/**
 * Utility for Meta Conversions API (CAPI) with Pixel Deduplication
 */

// Helper to get cookie value by name (for _fbp and _fbc)
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Generate unique event ID for Meta deduplication
export function generateEventId(eventName: string): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `${eventName.toLowerCase()}_${timestamp}_${randomStr}`;
}

export interface MetaUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

export interface MetaEventOptions {
  eventName: 'Lead' | 'Contact' | 'PageView' | 'ViewContent' | 'InitiateCheckout';
  eventId?: string;
  userData?: MetaUserData;
  customData?: Record<string, any>;
}

/**
 * Dispatches both Browser Pixel and Server Conversions API (CAPI) with identical event_id for Deduplication.
 */
export async function trackMetaConversion({
  eventName,
  eventId = generateEventId(eventName),
  userData = {},
  customData = {}
}: MetaEventOptions) {
  // 1. Fire Browser Pixel with eventID for deduplication
  if (typeof window !== 'undefined' && (window as any).fbq) {
    try {
      (window as any).fbq('track', eventName, customData, { eventID: eventId });
    } catch (e) {
      console.warn('[Meta Pixel Browser Error]', e);
    }
  }

  // 2. Extract Meta First-party cookies (_fbp and _fbc)
  const fbp = getCookie('_fbp');
  const fbc = getCookie('_fbc');

  const payloadUserData = {
    ...userData,
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {})
  };

  // 3. Post to Server CAPI endpoint asynchronously
  try {
    const response = await fetch('/api/meta-capi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        userData: payloadUserData,
        customData
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn('[Meta CAPI Server Dispatch Failed]', errorData);
    }
  } catch (err) {
    console.warn('[Meta CAPI Dispatch Network Error]', err);
  }
}
