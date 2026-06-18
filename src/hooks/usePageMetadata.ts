import { useEffect } from "react";

interface PageMetadataProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogUrl: string;
  ogImage?: string;
  ogType?: string;
}

export function usePageMetadata({
  title,
  description,
  canonicalUrl,
  ogUrl,
  ogImage = "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
  ogType = "article"
}: PageMetadataProps) {
  useEffect(() => {
    // 1. Update document title
    document.title = title;

    // Helper to find, update, and clean up duplicate meta tags
    const updateOrCreateMeta = (attributeName: 'name' | 'property', attrValue: string, contentValue: string) => {
      const selector = `meta[${attributeName}="${attrValue}"]`;
      const tags = document.querySelectorAll(selector);
      
      if (tags.length > 0) {
        // Update the first tag
        tags[0].setAttribute('content', contentValue);
        // Remove any duplicate tags that might exist in the head
        for (let i = 1; i < tags.length; i++) {
          tags[i].parentNode?.removeChild(tags[i]);
        }
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute(attributeName, attrValue);
        meta.setAttribute('content', contentValue);
        document.head.appendChild(meta);
      }
    };

    // Helper to find, update, and clean up duplicate link tags
    const updateOrCreateLink = (relValue: string, hrefValue: string) => {
      const selector = `link[rel="${relValue}"]`;
      const links = document.querySelectorAll(selector);
      
      if (links.length > 0) {
        // Update the first link
        links[0].setAttribute('href', hrefValue);
        // Remove duplicates
        for (let i = 1; i < links.length; i++) {
          links[i].parentNode?.removeChild(links[i]);
        }
      } else {
        const link = document.createElement('link');
        link.setAttribute('rel', relValue);
        link.setAttribute('href', hrefValue);
        document.head.appendChild(link);
      }
    };

    // Apply basic metadata
    updateOrCreateMeta('name', 'title', title);
    updateOrCreateMeta('name', 'description', description);
    updateOrCreateLink('canonical', canonicalUrl);

    // Apply Open Graph (FB / WhatsApp / etc)
    updateOrCreateMeta('property', 'og:title', title);
    updateOrCreateMeta('property', 'og:description', description);
    updateOrCreateMeta('property', 'og:url', ogUrl);
    updateOrCreateMeta('property', 'og:type', ogType);
    updateOrCreateMeta('property', 'og:image', ogImage);
    updateOrCreateMeta('property', 'og:image:secure_url', ogImage);

    // Apply Twitter Cards
    updateOrCreateMeta('name', 'twitter:title', title);
    updateOrCreateMeta('name', 'twitter:description', description);
    updateOrCreateMeta('name', 'twitter:url', ogUrl);
    updateOrCreateMeta('name', 'twitter:image', ogImage);
  }, [title, description, canonicalUrl, ogUrl, ogImage, ogType]);
}
