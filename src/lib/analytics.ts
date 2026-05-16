// Helper function for tracking events
export const trackEvent = (action: string, category: string, label: string) => {
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
};
