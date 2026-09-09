import { trackMetaConversion } from './metaCapi';

// Helper function for tracking events
export const trackEvent = (
  action: string, 
  category: string, 
  label: string, 
  userData?: { email?: string; phone?: string; firstName?: string; lastName?: string }
) => {
  // Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }

  // Microsoft Clarity
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity("event", action);
  }

  // Meta Conversions API + Pixel Deduplication
  if (action.includes('lead') || action === 'Lead') {
    trackMetaConversion({
      eventName: 'Lead',
      userData,
      customData: { content_name: label, category }
    });
  } else if (action === 'whatsapp_click' || action.includes('contact') || action === 'Contact') {
    trackMetaConversion({
      eventName: 'Contact',
      userData,
      customData: { content_name: label, category }
    });
  }
};


